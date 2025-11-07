import * as React from 'react';
import { Button, Grid, GridItem, CodeBlock, CodeBlockCode, Title } from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';
import { SidebarContext } from '../../app/SidebarContext';

interface ComponentWithHTMLProps {
  component: React.ReactElement;
  title?: string;
}

interface FormattedLine {
  text: string;
  type: 'tag' | 'closing-tag' | 'attribute' | 'text' | 'comment' | 'doctype';
}

/**
 * Helper function to format HTML with syntax highlighting
 * Returns an array of formatted lines with type information for styling
 */
const formatHTML = (html: string): FormattedLine[] => {
  if (!html) return [];
  
  // Add line breaks between tags for formatting
  let formatted = html.replace(/(>)(<)(\/*)/g, '$1\n$2$3');
  
  // Basic indentation and type detection
  let indent = 0;
  const lines = formatted.split('\n');
  const formattedLines: FormattedLine[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    let type: FormattedLine['type'] = 'text';
    
    // Detect line type
    if (trimmed.startsWith('<!')) {
      type = 'doctype';
    } else if (trimmed.startsWith('<!--')) {
      type = 'comment';
    } else if (trimmed.match(/^<\/\w/)) {
      type = 'closing-tag';
      indent = Math.max(0, indent - 1);
    } else if (trimmed.match(/^<\w/)) {
      type = 'tag';
    }
    
    const indented = '  '.repeat(indent) + trimmed;
    formattedLines.push({ text: indented, type });
    
    // Increase indent for opening tags (but not self-closing)
    if (trimmed.match(/^<\w/) && 
        !trimmed.match(/\/>/) && 
        !trimmed.match(/<(input|img|br|hr|meta|link|area|base|col|embed|source|track|wbr)/i)) {
      indent++;
    }
  });
  
  return formattedLines;
};

/**
 * Helper to render a line with syntax highlighting
 * Uses regex to tokenize and color different parts of HTML
 */
const renderLine = (line: FormattedLine, index: number): React.ReactNode => {
  const { text, type } = line;
  
  // Color mapping for different element types
  const colors = {
    tag: '#4EC9B0',           // Cyan for tags
    attributeName: '#92C5F7',  // Light blue for attribute names
    dataAttributeName: '#C586C0', // Purple for data-* attributes (semantic UI)
    attributeValue: '#CE9178', // Orange for attribute values
    dataAttributeValue: '#DCDCAA', // Light yellow for data-* attribute values
    text: '#CE9178',           // Orange for text content
    comment: '#6A9955',        // Green for comments
    doctype: '#569CD6'         // Blue for doctype
  };
  
  // Handle comments
  if (type === 'comment') {
    return <span key={index} style={{ color: colors.comment, fontStyle: 'italic' }}>{text}</span>;
  }
  
  // Handle doctype
  if (type === 'doctype') {
    return <span key={index} style={{ color: colors.doctype }}>{text}</span>;
  }
  
  // Handle tags (opening and closing)
  if (type === 'tag' || type === 'closing-tag') {
    // Tokenize: tag name, attributes, closing bracket
    const parts: Array<{ text: string; style: React.CSSProperties }> = [];
    let remaining = text;
    
    // Extract tag name (e.g., <div, </div, <button)
    const tagMatch = remaining.match(/^(<\/?\w+)/);
    if (tagMatch) {
      parts.push({ text: tagMatch[1], style: { color: colors.tag, fontWeight: '500' } });
      remaining = remaining.substring(tagMatch[1].length);
    }
    
    // Extract attributes (key="value" or key='value')
    // Note: \w+ doesn't match hyphens, so we need to allow hyphens for data-* attributes
    const attrPattern = /(\s+)([\w-]+)(=)("[^"]*"|'[^']*'|[\w-]+)/g;
    let lastIndex = 0;
    let match;
    
    while ((match = attrPattern.exec(remaining)) !== null) {
      // Text before attribute
      if (match.index > lastIndex) {
        parts.push({ text: remaining.substring(lastIndex, match.index), style: { color: '#D4D4D4' } });
      }
      
      const isDataAttribute = match[2].startsWith('data-');
      
      // Whitespace
      parts.push({ text: match[1], style: { color: '#D4D4D4' } });
      // Attribute name - use different color for data-* attributes
      parts.push({ 
        text: match[2], 
        style: { 
          color: isDataAttribute ? colors.dataAttributeName : colors.attributeName,
          fontWeight: isDataAttribute ? '600' : 'normal'
        } 
      });
      // Equals sign
      parts.push({ text: match[3], style: { color: '#D4D4D4' } });
      // Attribute value - use different color for data-* attribute values
      parts.push({ 
        text: match[4], 
        style: { 
          color: isDataAttribute ? colors.dataAttributeValue : colors.attributeValue 
        } 
      });
      
      lastIndex = attrPattern.lastIndex;
    }
    
    // Remaining text (closing bracket, etc.)
    if (lastIndex < remaining.length) {
      parts.push({ text: remaining.substring(lastIndex), style: { color: colors.tag } });
    }
    
    if (parts.length > 0) {
      return (
        <span key={index}>
          {parts.map((part, i) => (
            <span key={i} style={part.style}>{part.text}</span>
          ))}
        </span>
      );
    }
    
    return <span key={index} style={{ color: colors.tag }}>{text}</span>;
  }
  
  // Handle text content
  if (type === 'text') {
    return <span key={index} style={{ color: colors.text }}>{text}</span>;
  }
  
  return <span key={index} style={{ color: '#D4D4D4' }}>{text}</span>;
};

export const ComponentWithHTML: React.FunctionComponent<ComponentWithHTMLProps> = ({ 
  component, 
  title 
}) => {
  const sidebarContext = React.useContext(SidebarContext);
  // Only show HTML when sidebar is collapsed (to save screen space)
  const shouldShowHTMLByDefault = !sidebarContext.isSidebarOpen;
  const [showHTML, setShowHTML] = React.useState(shouldShowHTMLByDefault);
  const [htmlContent, setHtmlContent] = React.useState<FormattedLine[]>([]);
  const componentRef = React.useRef<HTMLDivElement>(null);

  // Update showHTML when sidebar state changes
  React.useEffect(() => {
    if (!sidebarContext.isSidebarOpen) {
      // Sidebar collapsed - show HTML by default
      setShowHTML(true);
    } else {
      // Sidebar open - hide HTML to save space
      setShowHTML(false);
    }
  }, [sidebarContext.isSidebarOpen]);

  // Update HTML whenever the component updates or showHTML changes
  React.useEffect(() => {
    const updateHTML = () => {
      if (componentRef.current && showHTML) {
        // Get the HTML content from the rendered component
        const html = componentRef.current.innerHTML;
        // Try to format it, but fall back to raw HTML if formatting fails
        try {
          setHtmlContent(formatHTML(html));
        } catch (e) {
          // Fallback to raw HTML as simple text lines
          setHtmlContent([{ text: html, type: 'text' }]);
        }
      }
    };

    // Initial update
    const timeoutId = setTimeout(updateHTML, 100);

    // Use MutationObserver to watch for DOM changes
    if (componentRef.current && showHTML) {
      const observer = new MutationObserver(() => {
        updateHTML();
      });

      observer.observe(componentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }

    return () => clearTimeout(timeoutId);
  }, [component, showHTML]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px',
        padding: '12px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #d1d1d1'
      }}>
        {title && (
          <Title headingLevel="h3" size="md">
            {title}
          </Title>
        )}
        <Button
          variant="secondary"
          icon={showHTML ? <EyeSlashIcon /> : <EyeIcon />}
          onClick={() => setShowHTML(!showHTML)}
        >
          {showHTML ? 'Hide HTML' : 'Show HTML'}
        </Button>
      </div>

      <Grid hasGutter>
        <GridItem 
          span={showHTML ? 6 : 12}
          style={{ 
            borderRight: showHTML ? '1px solid #d1d1d1' : 'none',
            paddingRight: showHTML ? '16px' : '0',
            minHeight: '400px'
          }}
        >
          <div ref={componentRef} style={{ width: '100%' }}>
            {component}
          </div>
        </GridItem>

        {showHTML && (
          <GridItem 
            span={6}
            style={{ 
              paddingLeft: '16px',
              maxHeight: 'calc(100vh - 200px)',
              overflow: 'auto'
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <Title headingLevel="h4" size="sm">
                Rendered HTML Output
              </Title>
            </div>
            <CodeBlock style={{ 
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'monospace',
              lineHeight: '1.4',
              maxHeight: 'calc(100vh - 300px)',
              overflow: 'auto'
            }}>
              <CodeBlockCode 
                style={{ 
                  whiteSpace: 'pre',
                  wordBreak: 'normal',
                  display: 'block'
                }}
              >
                {htmlContent.length > 0 ? (
                  <div style={{ 
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    lineHeight: '1.5'
                  }}>
                    {htmlContent.map((line, index) => {
                      const isTag = line.type === 'tag' || line.type === 'closing-tag';
                      const isText = line.type === 'text';
                      
                      return (
                        <div 
                          key={index} 
                          style={{ 
                            marginBottom: isTag ? '3px' : isText ? '1px' : '0px',
                            paddingTop: isTag ? '1px' : '0px',
                            paddingBottom: isTag ? '1px' : '0px',
                            borderLeft: isTag ? '2px solid #4EC9B0' : 'none',
                            paddingLeft: isTag ? '4px' : '0px',
                            backgroundColor: isTag ? 'rgba(78, 201, 176, 0.05)' : 'transparent'
                          }}
                        >
                          {renderLine(line, index)}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  'Loading HTML...'
                )}
              </CodeBlockCode>
            </CodeBlock>
          </GridItem>
        )}
      </Grid>
    </div>
  );
};

