import React from "react";
import ModalMenu from "components/modalMenu";

const ModalExplan1 = () => {
  return (
    <ModalMenu title="概要">
      <h1>概要</h1>
      <p>
        むーちゃんは人の言葉に興味津々です。
        <br />
        是非むーちゃんに言葉を教えてあげてください。
        <br />
        <br />
        分からない言葉が多くて、たくさん質問されるかもしれませんが、怒らないで優しく対応してあげてください。
        <br />
        <br />
        むーちゃんは新しい言葉を覚えると嬉しくて
        <a
          href="https://twitter.com/MuchanApp"
          target="_blank"
        >
          Twitter
        </a>
        で呟いたりします。
        <br />
        <br />
        人を傷つけるような言葉は教えないようお願いします。
      </p>
    </ModalMenu>
  );
};

export default ModalExplan1;