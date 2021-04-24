import React from "react";
import ModalMenu from "components/modalMenu";

const ModalExplan2 = () => {
  return (
    <ModalMenu title="遊び方">
      <h1>遊び方</h1>
      <p>
        <ul>
          <li>お話をする</li>
          むーちゃんが質問してきたり、覚えた言葉を教えてくれたりします。
          <br />
          毎回違う事を話してくれるので、何度もお話してみてください。
          <li>言葉を教える</li>
          自由に言葉を教える事が出来ます。
          <br />
          たくさん言葉を教えてあげてください。
          <li>じゃんけん</li>
          むーちゃんとじゃんけんが出来ます。
          <br />
          むーちゃんは過去の戦歴を覚えているので聞いてみると面白いかもしれません。
        </ul>
      </p>
    </ModalMenu>
  );
};

export default ModalExplan2;
