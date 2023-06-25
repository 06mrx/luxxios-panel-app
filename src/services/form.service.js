

const getText = id => {
    return document.getElementById(id)?.value ? document.getElementById(id)?.value : ''
}

const getChecked = id => {
    return document.getElementById(id)?.checked ? document.getElementById(id)?.checked : false
}

const resetText = id => {
    let el = document.getElementById(id)
    if(el) el.value = ''
    // document.getElementById(id)?.value = ''
}

const resetChecked = id => {
    let el = document.getElementById(id)
    if(el) el.checked = false
    // document.getElementById(id)?.
}

export const formService = {
    getText,
    getChecked,
    resetText,
    resetChecked
}