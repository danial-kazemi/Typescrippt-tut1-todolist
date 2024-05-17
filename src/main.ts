import './css/style.css'
import FullList from './model/fullList'
import ListItem from './model/Listitem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    const itemEntryform = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryform.addEventListener("submit", (event: SubmitEvent): void=> {
        event.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) return

        const itemID : number = fullList.list.length ? parseInt(fullList.list[fullList.list.length -1].id) + 1 : 1

        const newItem = new ListItem(itemID.toString(), newEntryText);

        fullList.addItem(newItem);

        template.render(fullList);
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLBRElement;
    clearItems.addEventListener('click', (): void =>{
        fullList.clearList();
        template.clear();

    })

    fullList.load();
    template.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp)