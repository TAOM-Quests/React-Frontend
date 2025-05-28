import { Modal } from '../../../../components/UI/Modal/Modal'
import './WordleRulesModal.scss'

interface WordleRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WordleRulesModal = ({
  isOpen,
  onClose,
}: WordleRulesModalProps) => {
  return (
    <Modal
      title="Правила игры «5 букв»"
      isOpen={isOpen}
      onClose={onClose}
      className="rules-wordle-modal"
    >
      <div className="rules-wordle">
        <p className="body_l_m">
          На разгадку слова у вас пять попуток. после каждой попытки цвет букв
          меняется.
        </p>
        <div className="rules-wordle-rows">
          <div className="rules-wordle-row">
            <div className="rules-wordle-cell rules-wordle-cell--correct">
              <p>Л</p>
            </div>
            <p className="body_l_m">
              Буквы темно-яркого цвета - есть в загаданном слове и стоят на
              нужном месте.
            </p>
          </div>
          <div className="rules-wordle-row">
            <div className="rules-wordle-cell rules-wordle-cell--wrong">
              <p>Л</p>
            </div>
            <p className="body_l_m">
              Буквы серого цвета - таких букв нет в загаданном слове.
            </p>
          </div>
          <div className="rules-wordle-row">
            <div className="rules-wordle-cell rules-wordle-cell--almost">
              <p>Л</p>
            </div>
            <p className="body_l_m">
              Буквы светло-яркого цвета - есть в загаданном слове, но стоят в
              других местах.
            </p>
          </div>
        </div>
        <p className="body_l_m">
          Когда вы отгадаете слово, все буквы станут темно-яркого цвета.
        </p>
        <p className="body_l_m">
          В загаданном слове могут встретиться повторяющиеся буквы.
        </p>
        <p className="body_l_m">
          Буквы «Ё» в игре нет, вместо нее используйте букву «Е».
        </p>
      </div>
    </Modal>
  )
}
