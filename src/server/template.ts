export default (html) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/assets/style.css" />
    <title>DID VC Example</title>
</head>
<body>
<div id="root">${html}</div>
</body>
<script src="/assets/bundle.js"></script>
</html>
`;
