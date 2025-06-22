import { Modal } from '../../../../components/UI/Modal/Modal'
import './CrosswordRulesModal.scss'

interface CrosswordRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CrosswordRulesModal = ({
  isOpen,
  onClose,
}: CrosswordRulesModalProps) => {
  return (
    <Modal
      title="Правила игры «Кроссворд»"
      isOpen={isOpen}
      onClose={onClose}
      className="rules-crossword-modal"
    >
      <div className="rules-crossword">
        <p className="body_l_m">
          Необходимо разгадать все слова, вписав их в сетку кроссворда по
          горизонтали и вертикали.
        </p>
        <div className="rules-crossword-rows">
          <div className="rules-crossword-row">
            <div className="rules-crossword-cell">
              <span className="body_xs_sb">6</span>
            </div>
            <p className="body_l_m">
              К каждой ячейке кроссворда даётся номер и соответствующее
              определение или вопрос.
            </p>
          </div>
          <div className="rules-crossword-row">
            <div className="rules-crossword-cell rules-crossword-cell--correct">
              <p>Л</p>
            </div>
            <p className="body_l_m">
              Верное слово отображается зеленым цветом.
            </p>
          </div>
          <div className="rules-crossword-row">
            <div className="rules-crossword-cell rules-crossword-cell--wrong">
              <p>Л</p>
            </div>
            <p className="body_l_m">
              Неверное слово отображается красным цветом.
            </p>
          </div>
        </div>
        <p className="body_l_m">
          После заполнения всего кроссворда нажмите кнопку «Проверить ответы».
        </p>
        <p className="body_l_m">
          Неправильные слова будут выделены. Вы можете исправить их и повторно
          проверить.
        </p>
        <p className="body_l_m">
          Кроссворд считается разгаданным, когда все слова введены правильно.
        </p>
      </div>
    </Modal>
  )
}
