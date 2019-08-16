import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import { bind } from 'decko'
import RepositoriesBrowser from '../repositories-browser'
import markerUrl from './marker.svg'

class RepositoriesMap extends Component {
  mapContainer = null

  state = {
    isLoading: true,
  }

  // TODO: Dynamic import needs to be tested in old browsers
  async componentDidMount() {
    const L = await import('leaflet')
    const { MarkerClusterGroup } = await import('leaflet.markercluster')

    const coverLayer = L.tileLayer(
      'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        minZoom: 2,
        maxZoom: 12,
      }
    )
    const centerPosition = new L.LatLng(52.04, 0.76) // Milton Keynes position

    this.map = L.map(this.mapContainer, {
      center: centerPosition,
      zoom: 3,
      maxBounds: [[-90, -180], [90, 180]],
      layers: [coverLayer],
    })

    const { endpoint } = this.props
    const repositories = await RepositoriesBrowser.fetchRepositories(endpoint)

    const markerIcon = L.icon({
      iconUrl: markerUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    const markers = new MarkerClusterGroup({
      chunkedLoading: true,
      chunkProgress: this.updateLoadingState,
      icon: markerIcon,
    })

    repositories
      .filter(
        ({ name, repositoryLocation }) =>
          repositoryLocation != null &&
          repositoryLocation.latitude != null &&
          repositoryLocation.longitude != null &&
          name
      )
      .forEach(({ name, repositoryLocation }) => {
        const marker = L.marker(
          new L.LatLng(
            repositoryLocation.latitude,
            repositoryLocation.longitude
          ),
          {
            title: name,
            icon: markerIcon,
          }
        )
        marker.bindPopup(name)
        markers.addLayer(marker)
      })

    this.map.addLayer(markers)
  }

  @bind
  updateLoadingState(processedMarkers, totalMarkers) {
    if (processedMarkers >= totalMarkers) this.setState({ isLoading: false })
  }

  render() {
    const { className = '', tag: Tag = 'div' } = this.props
    const { isLoading } = this.state
    const classList = [
      'repositories-map',
      isLoading ? 'repositories-map-loading' : '',
      className,
    ]

    return (
      <Tag className={classList.join(' ')}>
        <div
          className="repositories-map-inner"
          ref={element => {
            this.mapContainer = element
          }}
        />
        {isLoading && (
          <Spinner color="primary" className="repositories-map-spinner" />
        )}
      </Tag>
    )
  }
}

export default RepositoriesMap
