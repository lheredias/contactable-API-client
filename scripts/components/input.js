export function input({label, id, name, type, placeholder = "", required = false, value = false}) {
  return `
  <div >
    ${ label ?
      `<label for="${id}"  >${label}</label>`
      : ""
    }
    <div class="input-container" >
      <input
        class="input"
        type="${type ? type : "text" }"
        placeholder="${placeholder}"
        id="${id}"
        name="${name ? name: id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      >
    </div>
  </div>
  `
}

export function select({label, id, name, value = ""}) {
  return `
  ${ label ?
    `<label for="${id}"  >${label}</label>`
    : ""
  }
  <div class="select-container">
    <select class="input-select" name="${name ? name: id}" id="${id}">
      <option ${"Family"==value ? "selected=true" : ""} value="Family">Family</option>
      <option ${"Friends"==value ? "selected=true" : ""} value="Friends">Friends</option>
      <option ${"Work"==value ? "selected=true" : ""} value="Work">Work</option>
      <option ${"Acquaintance"==value ? "selected=true" : ""} value="Acquaintance">Acquaintance</option>
    </select>
  </div>`
}