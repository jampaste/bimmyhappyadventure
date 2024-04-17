// Created by James Chen and 
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title DONE
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        if(locationData.glflag1){
            this.engine.glflag1 = true;
        }
        if(this.engine.glflag1 && locationData.Body2) {
            this.engine.show(locationData.Body2);
        }
        if(locationData.glflag2){
            this.engine.glflag2 = true;
        }
        if(this.engine.glflag2 && locationData.Body3) {
            this.engine.show(locationData.Body3);
        }
        if(locationData.glflag4){
            this.engine.glflag4 = true;
        }
        if(this.engine.glflag4 && locationData.Body4) {
            this.engine.show(locationData.Body4);
        }
        if(locationData.Choices) { // TODO: check if the location has any Choices
            if(locationData.Locked && this.engine.glflag4) {
                for(let choice of locationData.Locked) { // TODO: loop over the location's Choices
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            }
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'bimmyhappyadventure.json');