import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { languageFromFilename } from '../../utils/languageFromExtension.js';
import { COLORS } from '../../config/colors.js';

// Panel de código con syntax highlighting. Presentacional puro: recibe el
// contenido ya cargado (el fetching vive en CodeExplorer vía useGithubFile).
// El lenguaje se deriva de la extensión del fichero (función utilitaria), nunca
// hardcodeado por nombre. Scroll horizontal en líneas largas (overflow-x auto),
// sin word-wrap forzado, para no romper la indentación del código.
const CodeViewer = ({ filename, content }) => {
  const language = languageFromFilename(filename);

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-base font-mono">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines={false}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.8125rem',
          fontFamily: 'inherit',
        }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
        lineNumberStyle={{ color: COLORS.textSecondary, minWidth: '2.5em', userSelect: 'none' }}
      >
        {content ?? ''}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
