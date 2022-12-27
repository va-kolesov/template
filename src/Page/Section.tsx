import * as React from 'react';
interface SectionProps {
    children: React.ReactNode;
    caption: string;
    level: 'section' | 'subsection';
}
 
const Section: React.FunctionComponent<SectionProps> = ({children, level, caption}: SectionProps ) => {
    return ( 
    <div id="search-albums" className="section">
        <div className={level+'-caption'}>{caption}</div>
        {children}
    </div> );
}
 
export default Section;