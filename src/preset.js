import { create } from './index'
import _prefixer from './addon/prefixer'
import _keyframes from './addon/keyframes'
import _virtual from './addon/virtual'

const nano = create()

_keyframes(nano)
_virtual(nano)
_prefixer(nano)

const { rule, keyframes } = nano

export default nano

export { rule, keyframes }
