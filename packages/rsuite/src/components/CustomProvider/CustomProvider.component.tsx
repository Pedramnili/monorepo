import {ReactNode} from "react";
import {CustomProvider as RSCustomProvider} from "rsuite";
import {CustomProviderProps} from "rsuite/esm/CustomProvider/CustomContext";


export const CustomProvider= ({children, ...rest}: RSCustomProviderProps) => {
  return <RSCustomProvider {...rest}>{children}</RSCustomProvider>;
}


interface RSCustomProviderProps extends CustomProviderProps {
  children?: ReactNode;
}