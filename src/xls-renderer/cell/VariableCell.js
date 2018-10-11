import BaseCell from "./BaseCell";

class VariableCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {VariableCell}
     */
    apply(scope) {
        super.apply(scope);

        const path = scope.getCurrentTemplateValue().substring(3).split('.');

        scope.setCurrentOutputValue(path.reduce((p, c) => p[c] || {}, scope.vm));
        scope.incrementColl();

        return this;
    }

    /**
     * @inheritDoc
     * @param {string} value
     * @returns {boolean}
     */
    static match(value) {
        return value.substring(0, 2) === '##';
    }

}

export default VariableCell