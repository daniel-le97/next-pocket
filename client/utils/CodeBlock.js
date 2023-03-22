import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/styles/prism";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={a11yDark} wrapLines={true} wrapLongLines={true}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;
