export function isUnaryTag(tag) {
  let strs = `area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr`
  let tags = makeMap(strs)
  return tags[tag]
}

export function isNonPhrasingTag(tag) {
  let strs = `address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track`
  let tags = makeMap(strs)
  return tags[tag]
}

export function makeMap(strs) {
  let tags = strs.split(',')
  let o = {}
  for (let i = 0; i < tags.length; i++) {
    o[tags[i]] = true
  }
  return o
}

export class Element {
  constructor(root) {
    if (!(this instanceof Element)) {
      return new Element(root.tag, root.attrsMap, root.children)
    }
    this.tagName = root.tag
    this.props = root.attrsMap || {}
    this.children = root.children || []
  }

  render() {
    const el = document.createElement(this.tagName)
    const props = this.props

    for (let prop in props) {
      setAttr(el, prop, props[prop])
    }

    this.children.forEach((child) => {
      let childEl
      if (child.type === 1) {
        childEl = new Element(child).render()
      } else {
        if (child.isComment) {
          childEl = document.createComment(child.text);
        } else {
          childEl = document.createTextNode(child.text);
        }
      }
      el.appendChild(childEl)
    })
    return el
  }
}

function setAttr(el, propName, prop) {
  if (!prop) {
    el.setAttribute(propName, true)
  } else {
    el.setAttribute(propName, prop)
  }
}
