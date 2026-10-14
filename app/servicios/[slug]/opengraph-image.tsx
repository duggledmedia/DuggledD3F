import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { serviceCatalog } from '@/lib/service-catalog';

export const alt = 'Solución digital de Duggled';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const mark = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwMCA4MCAzODIgMzYwIj48cGF0aCBmaWxsPSIjZmY2YjM1IiBkPSJNMTM5IDEwM0gyOTNDMzg0IDEwMyA0NTcgMTcyIDQ1NyAyNThTMzg1IDQxNCAyOTMgNDE0SDEzOVExMjUgNDE0IDEyNSA0MDBWMzQ5UTEyNSAzMzQgMTM5IDMzNEgyODZDMzMyIDMzNCAzNjkgMzAwIDM2OSAyNTdTMzMyIDE4MCAyODYgMTgwSDEzOVExMjUgMTgwIDEyNSAxNjZWMTE3UTEyNSAxMDMgMTM5IDEwM1oiLz48cmVjdCBmaWxsPSIjZmY2YjM1IiB4PSIxMjUiIHk9IjIxOCIgd2lkdGg9Ijc4IiBoZWlnaHQ9Ijc3IiByeD0iMTMiLz48L3N2Zz4=';

export default async function ServiceOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceCatalog.find(item => item.id === slug) ?? serviceCatalog[0];
  const imageBuffer = await readFile(join(process.cwd(), 'public', 'services-og', `${service.id}.jpg`));
  const image = imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength) as ArrayBuffer;
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'#10110f',color:'#f5f3ed',fontFamily:'Arial, sans-serif'}}>
      <div style={{width:'68%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'48px 56px 48px 62px',position:'relative'}}>
        <div style={{position:'absolute',right:'-110px',top:'-170px',width:'520px',height:'520px',display:'flex',border:'1px solid rgba(255,113,62,.12)',borderRadius:'50%'}} />
        <div style={{display:'flex',alignItems:'center',fontSize:19,fontWeight:700,letterSpacing:'-.04em'}}><img src={mark} alt="" width={40} height={38} style={{marginRight:11}} />duggled<span style={{color:'#ff713e'}}>.</span></div>
        <div style={{display:'flex',flexDirection:'column'}}>
          <div style={{fontSize:13,letterSpacing:3,color:'#ff895e',marginBottom:17}}>{service.category}</div>
          <div style={{display:'flex',flexDirection:'column',fontSize:57,lineHeight:1.01,letterSpacing:'-.052em',fontWeight:600}}><span>{service.title[0]}</span><span style={{color:'#ff713e'}}>{service.title[1]}</span></div>
          <div style={{fontSize:17,lineHeight:1.48,color:'#b7bdad',marginTop:20,maxWidth:'650px'}}>{service.description}</div>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,.16)',paddingTop:20}}>
          <div style={{display:'flex',flexDirection:'column'}}><span style={{fontSize:10,letterSpacing:2,color:'#9ba291'}}>DESDE</span><strong style={{display:'flex',alignItems:'baseline',fontSize:40,letterSpacing:'-.04em',marginTop:5}}><span style={{fontSize:14,color:'#ff713e',marginRight:7}}>USD</span>{service.price}</strong></div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}><span style={{fontSize:10,letterSpacing:2,color:'#9ba291'}}>ENTREGA ESTIMADA</span><strong style={{fontSize:17,marginTop:9}}>{service.deadline}</strong></div>
        </div>
      </div>
      <div style={{position:'relative',display:'flex',width:'32%',height:'100%',overflow:'hidden',background:'#090a08'}}><img src={image as unknown as string} alt="" width={394} height={700} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/><div style={{position:'absolute',inset:0,display:'flex',background:'linear-gradient(90deg,#10110f 0%,transparent 18%,transparent 100%)'}}/></div>
    </div>,
    size,
  );
}
