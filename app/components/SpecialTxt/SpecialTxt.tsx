import { Text, TextProps } from "@chakra-ui/react";
import React from "react";
import styles from "./SpecialTxt.module.css";

interface SpecialTxtProps extends TextProps {
  children: React.ReactNode;
}

function SpecialTxt({ children, ...rest }: SpecialTxtProps) {
  return (
    <Text className={styles.shiny} {...rest}>
      {children}
    </Text>
  );
}

export default SpecialTxt;
