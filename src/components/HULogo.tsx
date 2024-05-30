import logoImg from '../assets/icons/logo.svg';
import logoLightImg from '../assets/icons/logo_light.svg';
import {ImgHTMLAttributes} from "react";

interface HULogoPropsI extends ImgHTMLAttributes<HTMLImageElement> {
  light?: boolean;
}

export default function HULogo(props: HULogoPropsI) {
  const propsCopy = {...props};
  delete propsCopy.light;
  if (props?.light) return <img {...propsCopy} src={logoImg} alt='logo'/>;
  return <img {...propsCopy} src={logoLightImg} alt='logo'/>;
}