import { Component, h, State } from '@stencil/core';
import { Geolocation } from "@capacitor/geolocation"
import { SettingsData } from '../../services/settings-data';


@Component({
  tag: 'app-settings',
  styleUrl: 'app-settings.css',
  shadow: true,
})
export class AppSettings {
  @State() useCurrentLocation: boolean = true
  @State() presetLocation: string = "Adelaide"
  @State() unit: string = "celsius"

  async componentDidLoad() {
    let coordinates = await Geolocation.getCurrentPosition()
    console.log(coordinates)
  }

  async componentWillLoad() {
    let [location, unit] = await Promise.all([
      SettingsData.getLocation(),
      SettingsData.getTemperatureUnit()
    ])
    this.useCurrentLocation = location.useCoords
    this.presetLocation = location.name 
    this.unit = unit
    console.log(this.useCurrentLocation)
  }

  async handleToggleLocation(ev){
    console.log(ev)
    if(ev === "current"){
      this.useCurrentLocation = true
      console.log(this.useCurrentLocation)
    } else {
      this.useCurrentLocation = false
      console.log(this.useCurrentLocation)
    }
    await SettingsData.setUseCoords(this.useCurrentLocation)
  }

  async handleLocationChange(location){
    this.presetLocation = location
    await SettingsData.setLocationName(location)
    console.log(location)
  }

  async handleUnitChange(unit){
    this.unit = unit
    await SettingsData.setTemperatureUnit(unit)
    console.log(unit)
  }

  render() {
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <small>
          You may choose to display weather either from yout current location, or a preset location of your choosing.
        </small>
        <ion-radio-group  onIonChange={ev=>this.handleToggleLocation(ev.detail.value)} value={this.useCurrentLocation ? "current" : "preset"}>
          <ion-item>
            <ion-label>Use current location</ion-label>
            <ion-radio slot="start" value="current"></ion-radio>
          </ion-item>
          <ion-item>
            <ion-label>Use preset location</ion-label>
            <ion-radio slot="start" value="preset"></ion-radio>
          </ion-item>
        </ion-radio-group>
        <small>
          When using a preset location, the location listed below will be used.
        </small>
        <ion-item>
          <ion-input type="text" value={this.presetLocation} onIonInput={(ev: any)=>{
            this.handleLocationChange(ev.target.value)
          }} />
        </ion-item>

        <small>
          Select the unit of measurement that you would like to use to display the weather:
        </small>
        <ion-radio-group value={this.unit} onIonChange={ev=>{
          this.handleUnitChange(ev.detail.value)
        }}>
          <ion-item>
            <ion-label>Celsius</ion-label>
            <ion-radio value="celsius" slot="start" />
          </ion-item>
          <ion-item>
            <ion-label>Fahrenheit</ion-label>
            <ion-radio value="fahrenheit" slot="start" />
          </ion-item>
          <ion-item>
            <ion-label>Kelvin</ion-label>
            <ion-radio value="kelvin" slot="start" />
          </ion-item>
        </ion-radio-group>
        <small hidden={this.unit != "kelvin"}>Kelvin? Seriously?</small>
      </ion-content>
    ]

    );
  }

}
