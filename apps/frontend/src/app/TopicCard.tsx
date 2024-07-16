import Stack from "@mui/material/Stack";
import {memo} from "react";
import {Topic} from "./types";
import {Link, Typography} from "@mui/material";

export type TopicCardProps = {
  topic: Topic;
  search: string;
};

const HighlightedText = ({text, highlight}: { text: string; highlight: string }) => {
  if (!highlight) {
    return <>{text}</>;
  }
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} style={{backgroundColor: "yellow"}}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export const TopicCard = memo(({topic, search}: TopicCardProps) => {
  console.log(topic)
  return (
    <Link href={topic.FirstURL} variant="body1">
      <HighlightedText text={topic.Text} highlight={search}/>
    </Link>
  );
});
