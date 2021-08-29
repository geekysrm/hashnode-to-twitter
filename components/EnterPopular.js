import countChars from "../utils/countChars";
import isEmoji from "isemoji";

export default function EnterPopular({
  idx,
  text,
  toAdd,
  editorTexts,
  setEditorTexts,
}) {
  return (
    <button
      onClick={() => {
        const curPos = document.getElementById(
          `tweet-${idx + 1}`
        ).selectionStart;
        const charsToBeAdded = `${text.slice(0, curPos)} ${toAdd} ${text.slice(
          curPos
        )}`.trim();
        if (countChars(charsToBeAdded) > 280) {
          return;
        }
        let newArray = [];
        for (let i = 0; i < editorTexts.length; i++) {
          if (i === idx) {
            newArray.push(charsToBeAdded);
          } else newArray.push(editorTexts[i]);
        }
        setEditorTexts(newArray);
      }}
    >
      <p>
        {isEmoji(toAdd) ? (
          toAdd
        ) : (
          <span className="px-2 bg-blue-100 rounded">{toAdd}</span>
        )}
      </p>
    </button>
  );
}
