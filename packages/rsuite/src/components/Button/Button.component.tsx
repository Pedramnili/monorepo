import {ReactNode} from "react";
import {Button as RSButton} from "rsuite"
import {ButtonProps} from "rsuite/esm/Button/Button";
import "./Button.scss"


export const Button = ({children, ...rest}: RSButtonProps) => {
  return (
    <RSButton className={"my_rsuite"} {...rest}>Test {children}</RSButton>
  );
};

interface RSButtonProps extends ButtonProps {
  children?: ReactNode;
}