export function selectTab(tabId){
    return{
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

export function showTabas(...tabIds) {

    const tabsToShow = {}
    //Passando o tributo 'elm' para o objeto tabsToShow
    tabIds.forEach(elm => tabsToShow[elm] = true)
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}

