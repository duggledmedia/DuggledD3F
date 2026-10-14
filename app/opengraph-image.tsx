import { ImageResponse } from 'next/og';

export const alt = 'Duggled — diseño, marketing y tecnología conectados';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const mark = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwMCA4MCAzODIgMzYwIj48cGF0aCBmaWxsPSIjZmY2YjM1IiBkPSJNMTM5IDEwM0gyOTNDMzg0IDEwMyA0NTcgMTcyIDQ1NyAyNThTMzg1IDQxNCAyOTMgNDE0SDEzOVExMjUgNDE0IDEyNSA0MDBWMzQ5UTEyNSAzMzQgMTM5IDMzNEgyODZDMzMyIDMzNCAzNjkgMzAwIDM2OSAyNTdTMzMyIDE4MCAyODYgMTgwSDEzOVExMjUgMTgwIDEyNSAxNjZWMTE3UTEyNSAxMDMgMTM5IDEwM1oiLz48cmVjdCBmaWxsPSIjZmY2YjM1IiB4PSIxMjUiIHk9IjIxOCIgd2lkdGg9Ijc4IiBoZWlnaHQ9Ijc3IiByeD0iMTMiLz48L3N2Zz4=';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'#10110f',color:'#f5f3ed',fontFamily:'Arial, sans-serif',padding:'58px 68px'}}>
      <div style={{position:'absolute',inset:0,display:'flex',background:'linear-gradient(105deg,#10110f 0%,#10110f 55%,#181b14 100%)'}} />
      <div style={{position:'absolute',right:'-90px',top:'-130px',width:'600px',height:'600px',display:'flex',border:'1px solid rgba(255,113,62,.18)',borderRadius:'50%'}} />
      <div style={{position:'absolute',right:'35px',top:'8px',width:'430px',height:'430px',display:'flex',border:'1px solid rgba(245,243,237,.09)',borderRadius:'50%'}} />
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'67%'}}>
        <div style={{display:'flex',alignItems:'center',fontSize:20,fontWeight:700,letterSpacing:'-.04em'}}><img src={mark} alt="" width={42} height={40} style={{marginRight:12}} />duggled<span style={{color:'#ff713e'}}>.</span></div>
        <div style={{display:'flex',flexDirection:'column'}}>
          <div style={{fontSize:14,letterSpacing:3,color:'#ff895e',marginBottom:22}}>DISEÑO + MARKETING + TECNOLOGÍA</div>
          <div style={{display:'flex',flexDirection:'column',fontSize:67,lineHeight:1.02,letterSpacing:'-.055em',fontWeight:600}}><span>Ideas que conectan.</span><span style={{color:'#ff713e'}}>Negocios que avanzan.</span></div>
          <div style={{fontSize:19,lineHeight:1.5,color:'#b8beae',marginTop:25}}>Webs, campañas y sistemas digitales pensados como un todo.</div>
        </div>
        <div style={{display:'flex',fontSize:14,color:'#9da493',letterSpacing:1.5}}>DUGGLED.COM.AR <span style={{color:'#ff713e',marginLeft:16}}>↗</span></div>
      </div>
      <div style={{position:'absolute',right:'93px',top:'142px',width:'320px',height:'300px',display:'flex',alignItems:'center',justifyContent:'center',transform:'rotate(-7deg)',filter:'drop-shadow(0 30px 35px rgba(0,0,0,.45))'}}><img src={mark} alt="" width={300} height={284} /></div>
      <div style={{position:'absolute',right:'348px',top:'270px',width:'11px',height:'11px',display:'flex',borderRadius:'50%',background:'#ff713e',boxShadow:'0 0 24px #ff713e'}} />
      <div style={{position:'absolute',right:'88px',bottom:'105px',fontSize:11,letterSpacing:4,color:'#9ba18f',display:'flex'}}>DEL CAOS AL ORDEN.</div>
    </div>,
    size,
  );
}
