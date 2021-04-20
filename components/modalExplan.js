import React from "react";
import ModalMenu from "components/modalMenu";

const ModalExplan = () => {
  return (
    <ModalMenu title="説明">
      <h1>説明</h1>
      <p>
        むーちゃんは人の言葉に興味津々です。
        <br />
        是非むーちゃんに言葉を教えてあげてください。
        <br />
        <br />
        分からない言葉が多くて、たくさん質問されるかもしれませんが、怒らないで優しく対応してあげてください。
        <br />
        <br />
        むーちゃんは新しい言葉を覚えると嬉しくてtwitterで呟いたりします。
        <br />
        <br />
        人を傷つけるような言葉は教えないようお願いします。
      </p>
    </ModalMenu>
  );
};

export default ModalExplan;
