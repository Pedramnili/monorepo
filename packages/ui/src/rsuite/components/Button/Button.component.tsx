import {ReactNode} from "react";
import {Button} from "rsuite"
import {ButtonProps} from "rsuite/esm/Button/Button";
import "./Button.scss"


export const RButton = ({children, ...rest}: RButtonProps) => {
  return (
    <Button className={"my_rsuite"} {...rest}>Test {children}</Button>
  );
};

interface RButtonProps extends ButtonProps {
  children?: ReactNode;
}