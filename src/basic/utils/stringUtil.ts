class StringUtililty {
  public isEmpty(value: string | undefined) {
    if (!value) return true
    if (value === '') return true

    return false
  }

  public numberCommaSeparate(numStr: string | undefined) {
    if (!this.isNumber(numStr)) return '0'

    return Number(numStr).toLocaleString()
  }

  public isNumber(numStr: string | undefined) {
    if (this.isEmpty(numStr)) return false

    const num = parseInt(numStr!)
    if (Number.isNaN(num)) return false

    return true
  }
}

export const StringUtil = new StringUtililty()
