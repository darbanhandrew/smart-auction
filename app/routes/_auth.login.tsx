import { AppIcon } from "@components/app-icon";
import { ThemedTitleV2 } from "@refinedev/antd";
import {AuthPage} from "../components/pages/auth";
export default function Login() {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="اسمارت آکشن"
          icon={<AppIcon />}
        />
      }
    />
  );
}
