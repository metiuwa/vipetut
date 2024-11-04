import Joyride from "react-joyride";
import { useFirstTimeUserStore } from "@Store";

export const Walkthrough = () => {
  const { toggleIsFirstTimeUser } = useFirstTimeUserStore();
  const steps = [
   
  ];

  return (
    <Joyride
      // @ts-ignore
      steps={steps}
      debug={true}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          backgroundColor: "#eee",
          primaryColor: "rgb(109 40 217)",
          width: 400,
        },
      }}
      callback={e => {
        if (e.action === "reset") toggleIsFirstTimeUser();
      }}
    />
  );
};
