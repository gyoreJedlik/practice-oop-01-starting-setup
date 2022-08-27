class Tooltip {}

class DOMHelper {
    static clearEventListener(element) {
        const cloneElement = element.cloneNode(true);
        element.replaceWith(cloneElement);
    }
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}

class ProjectItem {
    constructor(id, updateProjectListFunction) {
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }
    connectMoreInfoButton() {};

    connectSwitchButton(type)  {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type'); //utolso gomb kivalasztasa 
        switchBtn = DOMHelper.clearEventListener(switchBtn);
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
    }

    update(updatedProjectListFn, type) {
        this.updateProjectListHandler = updatedProjectListFn;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type, setSwitchHandlerFunction) {
        this.type = type;
        this.setSwitchHandler = this.setSwitchHandlerFunction;
        const prjItmes = document.querySelectorAll(`#${type}-projects li`)  //{xy}  -project végű összes li tag összeszedése 
        for (const prjItem of prjItmes) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
    console.log(this.projects);
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${type}-projects ul`)
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId))
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active', );
        const finishedProjectList = new ProjectList('finished', );

        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
        
    }
}

App.init();