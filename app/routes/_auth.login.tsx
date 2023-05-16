import { AppIcon } from "@components/app-icon";
import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";

export default function Login() {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="میز کار حراجی هوشمند"
          icon={<AppIcon />}
        />
      }
    />
  );
}
