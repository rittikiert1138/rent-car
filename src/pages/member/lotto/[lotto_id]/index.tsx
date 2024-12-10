"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import MemberLayout from "@/components/member/includes/MemberLayout";
import CheckboxLotto from "@/components/member/lotto/CheckboxLotto";
import CheckboxGroup from "@/components/member/lotto/CheckboxGroup";
import CheckboxList from "@/components/member/lotto/CheckboxList";
import BetCondition from "@/components/member/lotto/BetCondition";
import BetSection from "@/components/member/lotto/BetSection";
import { LIST_BET_TYPE, LIST_BET_GROUP } from "@/constants/constants";
import withProtectedMember from "@/hoc/withProtectedMember";
import { api } from "@/utils/api";
import { useMember } from "@/context/MemberContext";
import { useParams } from "next/navigation";

interface ConditionTypes {
  listId?: number;
  label?: string;
  unit?: string;
  value?: number;
  type?: number;
  span?: number;
  min?: number;
  max?: number;
  maxPerUnit?: number;
}

const LottoPage = () => {
  const { member } = useMember();
  const { lotto_id } = useParams();

  const [section, setSection] = useState<number>(1);
  const [tabs, setTabs] = useState<number>(1);
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [typeActive, setTypeactive] = useState<Array<number>>([]);
  const [betType, setBettype] = useState<number>(0);
  const [condition, setCondition] = useState<Array<ConditionTypes | undefined> | any>([]);
  const [betList, setBetlist] = useState<Array<string | number> | any>([]);
  const [allSwipe, setAllSwipe] = useState<Array<number>>([]);
  const [frontSwipe, setFrontSwipe] = useState<Array<number>>([]);
  const [backSwipe, setBackSwipe] = useState<Array<number>>([]);
  const [digit, setDigit] = useState<string>("");
  const [shortcut, setShortcut] = useState<number>(1);
  const [limit, setLimit] = useState<Array<any>>([]);

  const getLimits = async () => {
    try {
      const payload = {
        user_id: member?.user_id,
        lotto_id: Number(lotto_id),
      };
      const response = await api.post("/api/member/lotto/limit/list", payload);
      if (response.data.status === true) {
        setLimit(response.data.limits);
      }
    } catch (error) {
      console.log("Error ==>", error?.message);
    }
  };

  useEffect(() => {
    if (lotto_id && member?.user_id) {
      getLimits();
    }
  }, [lotto_id, member]);

  // console.log(limit);

  const zeroPad = (num: number, places: number) => String(num).padStart(places, "0");

  const handleBetType = (_value: number, _type: number, _betId: number) => {
    const findCondition = LIST_BET_TYPE.find((l) => l.listId === _betId);

    if (betType !== _type) {
      setBettype(_type);
      setTypeactive([]);
      setTypeactive([_value]);
      setCondition([findCondition]);
    } else {
      setBettype(_type);
      const _typeActive = typeActive;
      const _condition = condition;
      const checkDuplicate = _typeActive.find((e) => e === _value);
      if (checkDuplicate) {
        const resultFilter = _typeActive.filter((e) => e !== _value);
        const filterNotCondition = _condition.filter((c: any) => c?.listId !== _betId);
        setTypeactive(resultFilter.sort((a: any, b: any) => a - b));
        setCondition(filterNotCondition.sort((a: any, b: any) => a.listId - b.listId));
        if (resultFilter.length === 0) {
          setBettype(0);
        }
      } else {
        setTypeactive(_typeActive.concat(_value).sort((a: any, b: any) => a - b));
        setCondition(_condition.concat(findCondition).sort((a: any, b: any) => a.listId - b.listId));
        if (_type === 1 && _value === 2) {
          const findResult = _typeActive.filter((e) => e !== 3);
          const filterNotCondition = _condition.filter((c: any) => c?.listId !== 3);
          setTypeactive(findResult.concat(_value).sort((a: any, b: any) => a - b));
          setCondition(filterNotCondition.concat(findCondition).sort((a: any, b: any) => a.listId - b.listId));
        }
        if (_type === 1 && _value === 3) {
          const findResult = _typeActive.filter((e) => e !== 2);
          const filterNotCondition = _condition.filter((c: any) => c?.listId !== 2);
          setTypeactive(findResult.concat(_value).sort((a: any, b: any) => a - b));
          setCondition(filterNotCondition.concat(findCondition).sort((a: any, b: any) => a.listId - b.listId));
        }
      }
    }
  };

  const checkActiveRadio = (_value: number, _type: number) => {
    if (_type !== betType) {
      return false;
    } else {
      const _listActive = typeActive;
      const resultActive = _listActive.filter((l) => l === _value);
      return resultActive.length > 0;
    }
  };

  const renderBetList = (_currentGroup: number, _digit: number, _rowSpan: string, _price: number) => {
    const resultElements = [];

    for (let i = _currentGroup; i < _currentGroup + 100; i++) {
      resultElements.push(
        <div className={_rowSpan} key={`bet_list_${i}`}>
          <CheckboxList unit={zeroPad(i, _digit)} handleBet={handleBet} betType={betType} betList={betList} price={_price} />
        </div>
      );
    }
    return resultElements;
  };

  const getThreeNumber = (_unit: string) => {
    const s = _unit.split("");
    const resultList: any = [];
    for (let i = 0; i <= 5; i++) {
      if (i === 0) {
        const checkDuplicate = resultList.find((e: any) => e === s[0] + s[1] + s[2]);
        if (!checkDuplicate) {
          resultList.push(s[0] + s[1] + s[2]);
        }
      } else if (i === 1) {
        const checkDuplicate = resultList.find((e: any) => e === s[0] + s[2] + s[1]);
        if (!checkDuplicate) {
          resultList.push(s[0] + s[2] + s[1]);
        }
      } else if (i === 2) {
        const checkDuplicate = resultList.find((e: any) => e === s[1] + s[0] + s[2]);
        if (!checkDuplicate) {
          resultList.push(s[1] + s[0] + s[2]);
        }
      } else if (i === 3) {
        const checkDuplicate = resultList.find((e: any) => e === s[1] + s[2] + s[0]);
        if (!checkDuplicate) {
          resultList.push(s[1] + s[2] + s[0]);
        }
      } else if (i === 4) {
        const checkDuplicate = resultList.find((e: any) => e === s[2] + s[0] + s[1]);
        if (!checkDuplicate) {
          resultList.push(s[2] + s[0] + s[1]);
        }
      } else if (i === 5) {
        const checkDuplicate = resultList.find((e: any) => e === s[2] + s[1] + s[0]);
        if (!checkDuplicate) {
          resultList.push(s[2] + s[1] + s[0]);
        }
      }
    }
    return resultList;
  };

  const getTwoNumber = (_unit: string) => {
    const s = _unit.split("");
    const resultList: any = [];

    for (let i = 0; i <= 1; i++) {
      if (i === 0) {
        const checkDuplicate = resultList.find((e: any) => e === s[0] + s[1]);
        if (!checkDuplicate) {
          resultList.push(s[0] + s[1]);
        }
      } else if (i === 1) {
        const checkDuplicate = resultList.find((e: any) => e === s[1] + s[0]);
        if (!checkDuplicate) {
          resultList.push(s[1] + s[0]);
        }
      }
    }

    return resultList;
  };

  const handleBet = (_betType: number, _unit: string, price: number) => {
    const _betList = [...betList];
    const result: any = [];

    const checkDuplicate = _betList.find((bet) => bet.unit === _unit);

    if (checkDuplicate && tabs === 1) {
      const checkReverse = typeActive.filter((t) => t === 3);
      if (checkReverse.length > 0) {
        if (betType === 1) {
          const listUnit = getThreeNumber(_unit);
          const resultFilter = _betList.filter((bet) => !listUnit.includes(bet.unit));
          setBetlist(resultFilter);
        } else if (betType === 2) {
          const listUnit = getTwoNumber(_unit);
          const resultFilter = _betList.filter((bet) => !listUnit.includes(bet.unit));
          setBetlist(resultFilter);
        }
      } else {
        const resultFilter = _betList.filter((bet) => bet.unit !== _unit);
        setBetlist(resultFilter);
      }
    } else {
      if (betType === 1) {
        for (let i = 0; i < typeActive.length; i++) {
          const _typeActive = typeActive[i];

          if (_typeActive === 3) {
            const listUnit = getThreeNumber(_unit);
            for (let x = 0; x < listUnit.length; x++) {
              const _list = listUnit[x];
              const _checkDuplicateList = result.filter((r: any) => r.unit === _list);
              if (!_checkDuplicateList.length) {
                const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
                const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
                result.push({ betId: uuidv4().replaceAll("-", "_"), betType: betType, unit: _list, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : price, bet_price: 1 });
              }
            }
          } else {
            if (_typeActive === 1) {
              const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
              const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
              result.push({ betId: uuidv4().replaceAll("-", "_"), betType: _typeActive, unit: _unit, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : price, bet_price: 1 });
            } else if (_typeActive === 2) {
              const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
              const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
              result.push({ betId: uuidv4().replaceAll("-", "_"), betType: _typeActive, unit: _unit, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : 150, bet_price: 1 });
            }
          }
        }
        setBetlist(betList.concat(result));
      } else if (betType === 2) {
        const checkReverse = typeActive.filter((t) => t === 3);
        if (checkReverse.length > 0) {
          const listUnit = getTwoNumber(_unit);
          for (let i = 0; i < typeActive.length; i++) {
            const _typeActive = typeActive[i];
            for (let x = 0; x < listUnit.length; x++) {
              const _list = listUnit[x];
              const _checkDuplicateList = result.filter((r: any) => r.unit === _list && r.betType === _typeActive);
              if (!_checkDuplicateList.length && _typeActive !== 3) {
                const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
                const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
                result.push({ betId: uuidv4().replaceAll("-", "_"), betType: _typeActive, unit: _list, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : price, bet_price: 1 });
              }
            }
          }
          setBetlist(betList.concat(result));
        } else {
          for (let i = 0; i < typeActive.length; i++) {
            const _typeActive = typeActive[i];
            const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
            const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
            result.push({ betId: uuidv4().replaceAll("-", "_"), betType: _typeActive, unit: _unit, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : price, bet_price: 1 });
          }
          setBetlist(betList.concat(result));
        }
      } else if (betType === 3) {
        for (let i = 0; i < typeActive.length; i++) {
          const _typeActive = typeActive[i];
          const betTypeId = LIST_BET_TYPE.find((e) => e.value === _typeActive && e.type === betType)?.betTypeId;
          const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === _unit);
          result.push({ betId: uuidv4().replaceAll("-", "_"), betType: _typeActive, unit: _unit, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : price, bet_price: 1 });
        }

        setBetlist(betList.concat(result));
      }
    }
    setTimeout(() => {
      setDigit("");
    }, 300);
  };

  const checkACtive2 = (_betType: number, _unit: string) => {
    const getListByType = betList.filter((e: any) => e.unit === _unit);
    return getListByType.length > 0;
  };

  const betShortcut = (_betType: number, _unit: string, _price: number) => {
    const currentValue = betList;
    if (_betType === 1) {
      const checkDuplicate = allSwipe.filter((e) => e === parseInt(_unit));
      if (checkDuplicate.length > 0) {
        const result = currentValue.filter((e: any) => e.unit.indexOf(_unit) !== 0 && e.unit.indexOf(_unit) !== 1);
        setBetlist(result);
        setAllSwipe(allSwipe.filter((e) => e !== parseInt(_unit)));
      } else {
        const resultList = [];
        for (let i = 0; i < typeActive.length; i++) {
          const _activeValue = typeActive[i];
          for (let i = 0; i < 100; i++) {
            const element = zeroPad(i, 2);
            if (element.indexOf(_unit) === 1 || element.indexOf(_unit) === 0) {
              const betTypeId = LIST_BET_TYPE.find((e) => e.value === _activeValue && e.type === betType)?.betTypeId;
              const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === element);
              resultList.push({ betId: uuidv4().replaceAll("-", "_"), betType: _activeValue, unit: element, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : _price, bet_price: 1 });
            }
            setBetlist(betList.concat(resultList));
          }
        }
        setAllSwipe(allSwipe.concat(parseInt(_unit)));
      }
    } else if (_betType === 2) {
      const checkDuplicate = frontSwipe.filter((e) => e === parseInt(_unit));
      if (checkDuplicate.length > 0) {
        const result = currentValue.filter((e: any) => e.unit.indexOf(_unit) !== 0);
        setBetlist(result);
        setFrontSwipe(frontSwipe.filter((e) => e !== parseInt(_unit)));
      } else {
        const resultList = [];
        for (let i = 0; i < typeActive.length; i++) {
          const _activeValue = typeActive[i];
          for (let i = 0; i < 100; i++) {
            const element = zeroPad(i, 2);
            if (element.indexOf(_unit) === 0 && element.length === 2) {
              const betTypeId = LIST_BET_TYPE.find((e) => e.value === _activeValue && e.type === betType)?.betTypeId;
              const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === element);
              resultList.push({ betId: uuidv4().replaceAll("-", "_"), betType: _activeValue, unit: element, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : _price, bet_price: 1 });
            }
            setBetlist(betList.concat(resultList));
          }
        }
        setFrontSwipe(frontSwipe.concat(parseInt(_unit)));
      }
    } else if (_betType === 3) {
      const checkDuplicate = backSwipe.filter((e) => e === parseInt(_unit));
      if (checkDuplicate.length > 0) {
        const result = currentValue.filter((e: any) => e.unit.indexOf(_unit) !== 1 && e.unit.lastIndexOf(_unit) !== 1);
        setBetlist(result);
        setBackSwipe(backSwipe.filter((e) => e !== parseInt(_unit)));
      } else {
        const resultList = [];
        for (let i = 0; i < typeActive.length; i++) {
          const _activeValue = typeActive[i];
          for (let i = 0; i < 100; i++) {
            const element = zeroPad(i, 2);
            const checkSameDigit = element.indexOf(_unit) === 0 && element.lastIndexOf(_unit) === 1;
            if ((element.indexOf(_unit) === 1 && element.length === 2) || checkSameDigit) {
              const betTypeId = LIST_BET_TYPE.find((e) => e.value === _activeValue && e.type === betType)?.betTypeId;
              const checkLimit = limit.find((l: any) => l.bet_type === betTypeId && l.limit_number === element);
              resultList.push({ betId: uuidv4().replaceAll("-", "_"), betType: _activeValue, unit: element, typeId: betType, price: checkLimit ? parseFloat(checkLimit.limit_amount) : _price, bet_price: 1 });
            }
            setBetlist(betList.concat(resultList));
          }
        }
        setBackSwipe(backSwipe.concat(parseInt(_unit)));
      }
    }

    setTimeout(() => {
      setDigit("");
    }, 300);
  };

  const handlePad = (_value: string) => {
    let currentDigit = digit;
    currentDigit += _value;
    setDigit(currentDigit);
    if (betType === 1) {
      if (currentDigit.length === 3) {
        handleBet(betType, currentDigit, 900);
      }
    } else if (betType === 2) {
      if (shortcut === 1) {
        if (currentDigit.length === 2) {
          handleBet(betType, currentDigit, 90);
        }
      } else if (shortcut === 2) {
        if (currentDigit.length === 1) {
          betShortcut(1, currentDigit, 90);
        }
      } else if (shortcut === 3) {
        if (currentDigit.length === 1) {
          betShortcut(2, currentDigit, 90);
        }
      } else if (shortcut === 4) {
        if (currentDigit.length === 1) {
          betShortcut(3, currentDigit, 90);
        }
      }
    } else if (betType === 3) {
      if (currentDigit.length === 1) {
        handleBet(betType, currentDigit, 3);
      }
    }
  };

  const handleDelete = () => {
    const currentDigit = digit;
    setDigit(currentDigit.substring(0, currentDigit.length - 1));
  };

  const betPadShortcut = (_type: number) => {
    if (_type === 1) {
      const resultList = [];
      for (let i = 0; i < 100; i++) {
        const element = zeroPad(i, 2);
        const splitElement = element.split("");
        if (splitElement[0] === splitElement[1]) {
          resultList.push({ betType: 2, unit: element, typeId: betType });
        }
        setBetlist(betList.concat(resultList));
      }
    } else if (_type === 2) {
      const resultList = [];
      for (let i = 0; i < 100; i++) {
        const element = zeroPad(i, 2);
        if (i >= 50) {
          resultList.push({ betType: 2, unit: element, typeId: betType });
        }
        setBetlist(betList.concat(resultList));
      }
    } else if (_type === 3) {
      const resultList = [];
      for (let i = 0; i < 100; i++) {
        const element = zeroPad(i, 2);
        if (i < 50) {
          resultList.push({ betType: 2, unit: element, typeId: betType });
        }
        setBetlist(betList.concat(resultList));
      }
    } else if (_type === 4) {
      const resultList = [];
      for (let i = 0; i < 100; i++) {
        const element = zeroPad(i, 2);
        if (i % 2 == 0) {
          resultList.push({ betType: 2, unit: element, typeId: betType });
        }
        setBetlist(betList.concat(resultList));
      }
    } else if (_type === 5) {
      const resultList = [];
      for (let i = 0; i < 100; i++) {
        const element = zeroPad(i, 2);
        if (i % 2 != 0) {
          resultList.push({ betType: 2, unit: element, typeId: betType });
        }
        setBetlist(betList.concat(resultList));
      }
    }
  };

  return (
    <MemberLayout title="แทงหวยนะ">
      <div className="mt-2 relative">
        {section === 1 && (
          <>
            <div className="sm:container px-2">
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-6">
                  <div className={classNames("w-full h-10 text-center pt-1 text-primary rounded-tl-md rounded-tr-md cursor-pointer", tabs === 1 ? "bg-white" : "bg-[#e9ecef]")} onClick={() => setTabs(1)}>
                    <span className="text-sm">เลือกจากแผง</span>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className={classNames("w-full h-10 text-center pt-1 text-primary rounded-tl-md rounded-tr-md cursor-pointer", tabs === 2 ? "bg-white" : "bg-[#e9ecef]")} onClick={() => setTabs(2)}>
                    <span className="text-sm">กดเลข</span>
                  </div>
                </div>
              </div>
              {tabs === 1 && (
                <div className="w-full bg-white rounded-sm p-2">
                  <div className="grid grid-cols-12 gap-1 mt-2">
                    {LIST_BET_TYPE.map((bet, indexBet) => (
                      <div className={`col-span-${bet.span}`} key={`list_bet_${bet.listId}_${indexBet}`}>
                        <CheckboxLotto id={`check_lotto_${bet.listId}`} label={bet.label} unit={bet.unit} active={checkActiveRadio(bet.value, bet.type)} onClick={() => handleBetType(bet.value, bet.type, bet.listId)} />
                      </div>
                    ))}
                  </div>
                  {betType === 0 && (
                    <div className="w-full py-10 text-center">
                      <i className="bi bi-arrow-up text-[100px] opacity-30 text-primary"></i>
                      <p className="-mt-6 text-primary">กรุณาเลือกประเภท</p>
                    </div>
                  )}
                  {betType === 1 && (
                    <>
                      <div className="grid grid-cols-10 gap-1 mt-2">
                        {LIST_BET_GROUP.map((group, indexGroup) => (
                          <div className="col-span-2" key={`group_bet_${group.groupId}_${indexGroup}`}>
                            <CheckboxGroup onClick={() => setCurrentGroup(group.value)} label={group.label} active={group.value === currentGroup} />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-10 gap-1 mt-4">{renderBetList(currentGroup, 3, "col-span-2", 900)}</div>
                    </>
                  )}
                  {betType === 2 && (
                    <>
                      <div className="grid grid-cols-12 gap-4 mt-2">
                        <div className="lg:col-span-4 col-span-12">
                          <h5 className="text-sm">19 ประตู</h5>
                          <div className="grid grid-cols-10 gap-1 mt-1">
                            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                              <div className="lg:col-span-2 col-span-1 cursor-pointer" key={`quick_one_${item}`}>
                                <div className={classNames("w-full border text-center py-1 rounded-sm")} onClick={() => betShortcut(1, item, 90)}>
                                  <p className="text-xs text-primary">{item}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                          <h5 className="text-sm">รูดหน้า</h5>
                          <div className="grid grid-cols-10 gap-1 mt-1">
                            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                              <div className="lg:col-span-2 col-span-1 cursor-pointer" key={`quick_two_${item}`}>
                                <div className={classNames("w-full border text-center py-1 rounded-sm")} onClick={() => betShortcut(2, item, 90)}>
                                  <p className="text-xs text-primary">{item}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                          <h5 className="text-sm">รูดหลัง</h5>
                          <div className="grid grid-cols-10 gap-1 mt-1">
                            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                              <div className="lg:col-span-2 col-span-1 cursor-pointer" key={`quick_three_${item}`}>
                                <div className={classNames("w-full border text-center py-1 rounded-sm")} onClick={() => betShortcut(3, item, 90)}>
                                  <p className="text-xs text-primary">{item}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-10 gap-1 mt-4">{renderBetList(0, 2, "md:col-span-1 col-span-2", 90)}</div>
                    </>
                  )}
                  {betType === 3 && (
                    <div className="grid grid-cols-10 gap-1 mt-2">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((item) => (
                        <div className="lg:col-span-2 col-span-1" key={`quick_one_${item}`}>
                          <div className={classNames("w-full border text-center py-1 rounded-sm cursor-pointer", checkACtive2(betType, item) ? "bg-primary text-white" : "text-primary bg-white")} onClick={() => handleBet(betType, item, 4)}>
                            <p className="text-xs">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tabs === 2 && (
                <div className="w-full bg-white rounded-sm p-2">
                  <div className="grid grid-cols-12 gap-1 mt-2">
                    {LIST_BET_TYPE.map((bet, indexBet) => (
                      <div className={`col-span-${bet.span}`} key={`list_bet_${bet.listId}_${indexBet}`}>
                        <CheckboxLotto id={`check_lotto_${bet.listId}`} label={bet.label} unit={bet.unit} active={checkActiveRadio(bet.value, bet.type)} onClick={() => handleBetType(bet.value, bet.type, bet.listId)} />
                      </div>
                    ))}
                  </div>
                  {betType === 0 && (
                    <div className="w-full py-10 text-center">
                      <i className="bi bi-arrow-up text-[100px] opacity-30 text-primary"></i>
                      <p className="-mt-6 text-primary">กรุณาเลือกประเภท</p>
                    </div>
                  )}
                  {betType === 1 && (
                    <>
                      <div className="flex mt-4 justify-center">
                        <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[0]}</div>
                        <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[1]}</div>
                        <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[2]}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 mt-4">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                          <div className="col-span-4" key={`keyboard_1_${item}`}>
                            <div className="w-full h-12 border border-slate-200 rounded text-center cursor-pointer text-primary pt-2" onClick={() => handlePad(item)}>
                              <span className="text-lg">{item}</span>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary">
                            <span className="text-lg">ย้อนกลับ</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handlePad("0")}>
                            <span className="text-lg">0</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handleDelete()}>
                            <span className="text-lg">ลบ</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {betType === 2 && (
                    <>
                      <div className="grid grid-cols-12 gap-1 mt-4">
                        <div className="col-span-3">
                          <div
                            className={classNames("w-full h-8  rounded  text-center pt-1 cursor-pointer", shortcut === 2 ? "bg-primary text-white" : "bg-slate-300 text-primary")}
                            onClick={() => {
                              if (shortcut == 2) {
                                setShortcut(1);
                              } else {
                                setShortcut(2);
                              }
                            }}
                          >
                            <span className="text-sm">19 ประตู</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div
                            className={classNames("w-full h-8  rounded  text-center pt-1 cursor-pointer", shortcut === 3 ? "bg-primary text-white" : "bg-slate-300 text-primary")}
                            onClick={() => {
                              if (shortcut == 3) {
                                setShortcut(1);
                              } else {
                                setShortcut(3);
                              }
                            }}
                          >
                            <span className="text-sm">รูดหน้า</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div
                            className={classNames("w-full h-8  rounded  text-center pt-1 cursor-pointer", shortcut === 4 ? "bg-primary text-white" : "bg-slate-300 text-primary")}
                            onClick={() => {
                              if (shortcut == 4) {
                                setShortcut(1);
                              } else {
                                setShortcut(4);
                              }
                            }}
                          >
                            <span className="text-sm">รูดหลัง</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="w-full h-8 bg-slate-300 rounded text-primary text-center pt-1 cursor-pointer" onClick={() => betPadShortcut(1)}>
                            <span className="text-sm">เลขเบิ้ล</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="w-full h-8 bg-slate-300 rounded text-primary text-center pt-1 cursor-pointer" onClick={() => betPadShortcut(2)}>
                            <span className="text-sm">สองตัวสูง</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="w-full h-8 bg-slate-300 rounded text-primary text-center pt-1 cursor-pointer" onClick={() => betPadShortcut(3)}>
                            <span className="text-sm">สองตัวต่ำ</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="w-full h-8 bg-slate-300 rounded text-primary text-center pt-1 cursor-pointer" onClick={() => betPadShortcut(4)}>
                            <span className="text-sm">สองตัวคู่</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="w-full h-8 bg-slate-300 rounded text-primary text-center pt-1 cursor-pointer" onClick={() => betPadShortcut(5)}>
                            <span className="text-sm">สองตัวคี่</span>
                          </div>
                        </div>
                      </div>
                      {shortcut == 1 ? (
                        <div className="flex mt-4 justify-center">
                          <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[0]}</div>
                          <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[1]}</div>
                        </div>
                      ) : (
                        <div className="flex mt-4 justify-center">
                          <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[0]}</div>
                        </div>
                      )}
                      <div className="grid grid-cols-12 gap-1 mt-4">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                          <div className="col-span-4" key={`keyboard_2_${item}`}>
                            <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handlePad(item)}>
                              <span className="text-lg">{item}</span>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary">
                            <span className="text-lg">ย้อนกลับ</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handlePad("0")}>
                            <span className="text-lg">0</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary">
                            <span className="text-lg">ลบ</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {betType === 3 && (
                    <>
                      <div className="flex mt-4 justify-center">
                        <div className="border w-14 h-20 mx-2 text-[30px] text-center border-b-[1px] border-b-primary pt-4">{digit.split("")[0]}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 mt-4">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
                          <div className="col-span-4" key={`keyboard_3_${item}`}>
                            <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handlePad(item)}>
                              <span className="text-lg">{item}</span>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary">
                            <span className="text-lg">ย้อนกลับ</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary" onClick={() => handlePad("0")}>
                            <span className="text-lg">0</span>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="w-full h-12 border border-slate-200 rounded text-center pt-2 cursor-pointer text-primary">
                            <span className="text-lg">ลบ</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {condition.length > 0 && (
                <div className="w-full bg-white rounded-sm p-2 mt-2">
                  <h5 className="text-primary">เงื่อนไขการแทง</h5>
                  {condition.map((c: any) => (
                    <BetCondition key={`bet_condition_${c.listId}`} label={c.label} unit={c.unit} min={c.min} max={c.max} maxPerUnit={c.maxPerUnit} />
                  ))}
                </div>
              )}
            </div>
            {betList.length > 0 ? (
              <div className="w-full h-12 fixed bg-slate-500 left-0 bottom-12 flex">
                <div className="w-[calc(100%)] bg-slate-200 text-center pt-3">
                  <span>รายการแทงทั้งหมด {betList.length} รายการ</span>
                </div>
                <div className="w-[200px] bg-purple-400 text-center pt-3 cursor-pointer" onClick={() => setSection(2)}>
                  <span className="text-white">
                    <span>
                      <i className="bi bi-currency-dollar"></i>
                    </span>
                    ใส่ราคา
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {section === 2 && <BetSection betList={betList} setSection={setSection} setBetlist={setBetlist} setTypeactive={setTypeactive} setBettype={setBettype} setCondition={setCondition} />}
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(LottoPage);
