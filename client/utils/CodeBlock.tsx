import React, { FC } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// export default class CodeBlock extends React.PureComponent {
//   static propTypes = {
//     value: PropTypes.array.isRequired,
//     language: PropTypes.string,
//   };

//   static defaultProps = {
//     language: null,
//   };

//   render() {
//     const { language, value } = this.props;

//     return (
//       <>

//           <SyntaxHighlighter
//             style={atomOneDark}
//             language={language as string}
//             wrapLongLines={true}
//             showLineNumbers={true}
//           >
//             {value}
//           </SyntaxHighlighter>

//       </>
//     );
//   }
// }

interface CodeBlockProps {
  value: string;
  language?: string;
}

const CodeBlock = ({ language, value }: {language?: string, value: string}) => (
  <>
    <SyntaxHighlighter
      style={atomOneDark}
      language={language ?? undefined}
      wrapLongLines={true}
      showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  </>
);



export default CodeBlock;
