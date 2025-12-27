//importing typewriter-effect
import Typewriter from "typewriter-effect";

export default function TypeText() {
  return (
    <p>
      <Typewriter
        options={{
          strings: ["Mustafizr Rahman Sumon", "MERN Stack Developer"],
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .pauseFor(1000)
            .deleteAll()
            .typeString("Mustafizr Rahman Sumon")
            .start();
        }}
      />
    </p>
  );
}
