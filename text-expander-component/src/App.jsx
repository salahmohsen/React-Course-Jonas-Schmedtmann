import React, { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <>
      <TextExpander>
        Karl Marx saw history as a continuous struggle between different
        classes, driven by economic forces. He believed that the conflicts
        between these classes shaped the course of history, and that the
        dominant class in any given period of history controlled the means of
        production and used this power to exploit the working class for their
        own benefit.
        <br />
        <br />
        Marx argued that in primitive societies, people lived in a state of
        relative equality, with no class distinctions or private property. As
        societies became more complex and developed, however, class distinctions
        emerged as some people were able to accumulate wealth and power through
        the control of land and resources. This led to the emergence of a ruling
        class, which used its power to exploit the working class, who were
        forced to sell their labor for a wage.
        <br />
        <br />
        Marx believed that the contradictions between the interests of the
        ruling class and the working class could not be resolved within the
        existing social and economic structures, and that this would inevitably
        lead to a revolutionary struggle between the classes. He saw the history
        of human society as a series of class struggles, culminating in the
        eventual overthrow of the ruling class by the working class, and the
        establishment of a classless society based on common ownership of the
        means of production.
        <br />
        <br />
        Marx's view of history has had a profound influence on social and
        political theory, and his ideas continue to shape debates about social
        justice, inequality, and the role of the state in society. While many of
        his predictions about the course of history have not come to pass, his
        analysis of the economic and political forces that shape society remains
        relevant and influential to this day.
      </TextExpander>
      <TextExpander>
        Guy Debord was a French Marxist philosopher and filmmaker who is best
        known for his theory of the spectacle. According to Debord, the
        spectacle is the dominant form of social organization in modern
        capitalist societies, characterized by the relentless production of
        images, media, and advertising that serve to distract and manipulate the
        masses.
        <br />
        <br />
        Debord argued that the spectacle is a system of social control that
        operates through the manipulation of images and the construction of
        false needs and desires. By creating a constant stream of media and
        advertising that appeals to our desires and emotions, the spectacle
        creates a false sense of reality that masks the true nature of social
        relations and perpetuates the existing power structures.
        <br />
        <br />
        Debord believed that the spectacle was not simply a passive form of
        entertainment, but an active force that actively shapes our perceptions
        of reality and our place within society. He argued that the spectacle
        was a form of alienation that separates us from our own experiences and
        from each other, creating a sense of isolation and disconnection that
        undermines our ability to act collectively to change the world.
        <br />
        <br />
        Debord's theory of the spectacle has had a profound influence on
        critical theory, media studies, and cultural studies, and continues to
        be relevant in the digital age. His critique of the commodification of
        culture and the manipulation of desire remains an important challenge to
        the dominant forms of social organization in contemporary society.
      </TextExpander>
    </>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 50,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  expanded = false,
}) {
  const [toggleExpander, setToggleExpander] = useState(expanded);
  function toggleHandler() {
    setToggleExpander(!toggleExpander);
  }
  const collapsedText =
    React.Children.toArray(children)
      .filter((item) => typeof item === "string")
      .join(" ")
      .split(" ")
      .slice(0, collapsedNumWords)
      .join(" ") + "...";

  return (
    <div className="container mx-auto flex flex-row  bg-gray-100  rounded-lg p-10 m-8">
      <p className="text-lg	 font-light text-gray-800 font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900">
        {toggleExpander ? children : collapsedText}
        <button
          className="px-3 ml-3 border-none hover:underline font-normal "
          onClick={toggleHandler}
        >
          {toggleExpander ? collapseButtonText : expandButtonText}
        </button>
      </p>
    </div>
  );
}
