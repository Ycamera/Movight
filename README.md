![スクリーンショット 2022-04-25 5 29 18](https://user-images.githubusercontent.com/96303806/164995276-ac9a5be6-460f-45c0-8fee-3645a652c975.png)




<h1>概要</h1>

一週間ほど勉強したReactの成果としてSPAサイトを製作してみました。
ここまでで製作期間は8日ほど。
(APIのドキュメントを読みながら要件定義：1日、HTML/JavaScript(React)のコーディング:5日、CSSのコーディング:2日)

映画の情報から出演キャスト、キャストから出演映画を無限に辿ることで気になる映画を探せるサイトです。

映画情報を取得する海外のAPI「TMDB」を利用して、非同期処理を織り交ぜなら動的にコンテンツを表示するように設計。
APIから日本語で情報が取得できなかった場合は、英語の情報を取得して表示するようにしてます。
レスポンシブ設計なので、スマホやタブレットなどにも対応。


追加した機能
・検索バー
・進む戻るボタン

ナビバー
・最新映画
・人気映画
・高評価な映画
