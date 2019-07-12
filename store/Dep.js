class Dep {
  deps = [];

  update(obj) {
    const changeData = {};
    const keys = Object.keys(obj);
    keys.forEach(k => {
      changeData[`store.${k}`] = obj[k]
    })
    this.deps.forEach(page => {
      page.setData(changeData)
    })
  }
  addDepend(page) {
    if (this.deps.indexOf(page) > -1) {
      return;
    }
    this.deps.push(page)
  }

  deleteDepend(page) {
    const index = this.deps.indexOf(page)
    if (index == -1) {
      return;
    }
    this.deps.splice(index, 1)
  }
}