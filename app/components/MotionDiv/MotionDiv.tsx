import { motion } from "framer-motion";
import dynamic from "next/dynamic";

function MotionDiv(props: any) {
  let isMobile = window.innerWidth < 768;

  if (isMobile) {
    return <div {...props}></div>;
  } else {
    return <motion.div {...props}></motion.div>;
  }
}

export default dynamic(() => Promise.resolve(MotionDiv), {
  ssr: false,
});
