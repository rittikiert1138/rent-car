import React from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Button } from "@/components/ui/button";

const MemberPage = () => {
  return (
    <MemberLayout>
      <div className="sm:container px-2 pb-20 mt-2">
        <div className="w-full  ">
          {/* <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="w-full h-[1000px] bg-slate-300"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-[1000px] bg-slate-300"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-[1000px] bg-slate-300"></div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}

          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-6">
              <Link href="/member/deposit">
                <Button className="w-full h-12" variant="secondary">
                  ฝากเงิน
                </Button>
              </Link>
            </div>
            <div className="col-span-6">
              <Link href="/member/witdraw">
                <Button className="w-full h-12" size="lg" variant="secondary">
                  ถอนเงิน
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full mt-2">
            <Link href="/member/lotto">
              <Button className="w-full h-12 text-center inline-block" size="xl">
                <img src="/icons/bell-light.png" className="w-5 block mx-auto" />
                <span className="w-full block text-xs leading-3">แทงหวย</span>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-6">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-piggy-bank text-primary text-lg"></i>
                <Link href="/member/deposit">
                  <span className="w-full block text-xs leading-3 -mt-1">ฝาก-ถอน</span>
                </Link>
              </Button>
            </div>
            <div className="col-span-6">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-file-text text-primary text-lg"></i>
                <Link href="/member/witdraw">
                  <span className="w-full block text-xs leading-3 -mt-1">รายงานเครดิต</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-people text-primary text-lg"></i>
                <Link href="/deposit">
                  <span className="w-full block text-xs leading-3 -mt-1">ระบบแนะนำ</span>
                </Link>
              </Button>
            </div>
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-gem text-primary text-lg"></i>
                <Link href="/witdraw">
                  <span className="w-full block text-xs leading-3 -mt-1">วีไอพี</span>
                </Link>
              </Button>
            </div>
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-list-ol text-primary text-lg"></i>
                <Link href="/witdraw">
                  <span className="w-full block text-xs leading-3 -mt-1">สร้างเลขชุด</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-book text-primary text-lg"></i>
                <Link href="/deposit">
                  <span className="w-full block text-xs leading-3 -mt-1">คู่มือใช้งาน</span>
                </Link>
              </Button>
            </div>
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-envelope-paper text-primary text-lg"></i>
                <Link href="/witdraw">
                  <span className="w-full block text-xs leading-3 -mt-1">กล่องจดหมาย</span>
                </Link>
              </Button>
            </div>
            <div className="col-span-4">
              <Button className="w-full h-12 inline-block" size="xl" variant="info">
                <i className="bi bi-chat-left-dots text-primary text-lg"></i>
                <Link href="/witdraw">
                  <span className="w-full block text-xs leading-3 -mt-1">ติดต่อเอเย่นต์</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberPage;
