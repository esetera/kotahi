import {
  imageNode,
  figureCaptionNode,
} from 'wax-prosemirror-schema';
import { PlaceHolderPlugin, captionPlugin } from 'wax-prosemirror-plugins';
import { Service } from "wax-prosemirror-services";
import { v4 as uuidv4 } from 'uuid';
import Image from './Image';
import './image.css';


const figureNode = {
  content: 'image* figcaption{0,1}',
  group: 'block',
  priority: 0,
  defining: true,
  attrs: {
    refId: { default: '' },
    linked:{default:''}

  },
  parseDOM: [
    {
      tag: 'figure',
      getAttrs(hook) {
        if (!hook.id) {
          return Object.assign(hook, {
            refId: uuidv4(),
          });
        } else {
          return Object.assign(hook, {
            refId: hook.id,
          });
        }

      },
    },
  ],
  toDOM(hook, next) {
    let attrs;
    if (hook.attrs.refId) {
      attrs = {
        'id': hook.attrs.refId,
        linked : hook.attrs.linked

      };
    } else {
      attrs = {
        'id': uuidv4(),
        linked : hook.attrs.linked
      }
    }
    // eslint-disable-next-line no-param-reassign
    return ['figure', attrs, 0];
  },
};

class ImageService extends Service {
  name = 'ImageService';

  boot() {
    this.app.PmPlugins.add(
      'imagePlaceHolder',
      PlaceHolderPlugin('imagePlaceHolder'),
    );
    this.app.PmPlugins.add('caption', captionPlugin('caption'));
  }

  register() {
    this.container.bind('Image').to(Image);
    const createNode = this.container.get('CreateNode');
    createNode({
      figure: figureNode,
    });

    createNode(
      {
        image: imageNode,
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        figcaption: figureCaptionNode,
      },
      // ,
      // { toWaxSchema: true },
    );
  }
}

export default ImageService;
