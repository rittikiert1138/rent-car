import React, { memo } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpConponentProps {
  dataOTP: any;
  setDataOTP: any;
}

const OtpConponent = ({ dataOTP, setDataOTP }: OtpConponentProps) => {
  return (
    <div>
      <InputOTP maxLength={6} onChange={(e) => setDataOTP({ ...dataOTP, data: e, error: false })}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OtpConponent;
