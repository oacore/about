param setLocation string = resourceGroup().location
param skuPlan string = 'Basic'
param skuId string = 'B1'
param webAppName string = 'core-about-test'

var linuxFxVersion = 'NODE|16-lts'
var hostingPlanName = 'hpn-${resourceGroup().name}'

resource app 'Microsoft.Web/sites@2022-09-01' = {
  name: webAppName
  location: setLocation
  kind: 'linux'
  properties: {
    name: webAppName
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      alwaysOn: true
    }
  }
}

resource hostPlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: hostingPlanName
  location: setLocation
  kind: 'linux'
  sku: {
    tier: skuPlan
    name: skuId
  }
  properties: {
    numberOfWorkers: '1'
    reserved: true
  }
}
