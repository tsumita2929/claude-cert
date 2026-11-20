import {Highlight, type PrismTheme} from 'prism-react-renderer';
import React from 'react';
import {interpolate} from 'remotion';
import {Heading, Rich} from '../parts';
import {theme} from '../theme';
import {useSteps} from '../timing';

const c = theme.color;

const codeTheme: PrismTheme = {
  plain: {color: c.codeInk, backgroundColor: 'transparent'},
  styles: [
    {types: ['comment'], style: {color: c.codeDim, fontStyle: 'italic'}},
    {types: ['string', 'attr-value', 'char'], style: {color: '#A9DDB6'}},
    {types: ['property', 'attr-name', 'keyword', 'tag'], style: {color: '#8AD4D8'}},
    {types: ['number', 'boolean', 'constant'], style: {color: '#F4BC86'}},
    {types: ['punctuation', 'operator'], style: {color: '#9BB0B4'}},
    {types: ['function', 'class-name'], style: {color: c.marker}},
  ],
};

/**
 * コードを見せる場面。
 * focus[k-1] に行番号（1始まり）の配列を書くと、step k でその行だけを明るくし、ほかを暗くする。
 * notes[k-1] に短い注釈を書くと、注目している行の右に付箋として出す。
 */
export const Code: React.FC<{heading: string; lead?: string; lang?: string; code: string; focus?: number[][]; notes?: (string | null)[]}> = ({
  heading,
  lead,
  lang = 'json',
  code,
  focus = [],
  notes = [],
}) => {
  const {step, since} = useSteps();
  const rows = code.split('\n').length;
  // 行数が少ないほど大きく組む。certvideo.py の検査（行数と1行の長さ）はこの大きさを前提にしている
  const fontSize = rows <= 6 ? 44 : rows <= 8 ? 40 : rows <= 10 ? 34 : 30;
  const lineH = Math.round(fontSize * 1.55);
  const noteH = Math.round(fontSize * 1.4);
  const k = step >= 1 && step < 99 ? step : 0;
  const now = k ? focus[k - 1] ?? [] : [];
  const before = k > 1 ? focus[k - 2] ?? [] : [];
  const t = k ? interpolate(since(k), [0, 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  const lit = (set: number[], line: number) => (set.length === 0 || set.includes(line) ? 1 : 0.34);
  const band = (set: number[], line: number) => (set.includes(line) ? 1 : 0);
  const note = k ? notes[k - 1] : null;

  return (
    <>
      <Heading heading={heading} lead={lead} />
      <div style={{position: 'relative', backgroundColor: c.codeBg, borderRadius: 10, padding: '28px 0'}}>
        <Highlight theme={codeTheme} code={code} language={lang}>
          {({tokens, getTokenProps}) => (
            <pre style={{margin: 0, fontFamily: theme.font.mono, fontSize, lineHeight: `${lineH}px`, color: c.codeInk}}>
              {tokens.map((line, i) => {
                const n = i + 1;
                const opacity = before.length || now.length ? lit(before, n) + (lit(now, n) - lit(before, n)) * t : 1;
                const bandOpacity = band(before, n) + (band(now, n) - band(before, n)) * t;
                return (
                  <div key={i} style={{position: 'relative', height: lineH, padding: '0 44px'}}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(18, 122, 128, 0.42)',
                        borderLeft: `8px solid ${c.marker}`,
                        opacity: bandOpacity,
                      }}
                    />
                    <span style={{position: 'relative', opacity}}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({token})} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
        {note && now.length ? (
          <div
            style={{
              position: 'absolute',
              right: 36,
              top: 28 + (Math.min(...now) - 1) * lineH + (lineH - noteH) / 2,
              height: noteH,
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: c.marker,
              color: c.ink,
              fontWeight: 700,
              fontSize: Math.round(fontSize * 0.8),
              borderRadius: 4,
              opacity: t,
            }}
          >
            <Rich plainCode>{note}</Rich>
          </div>
        ) : null}
      </div>
    </>
  );
};
