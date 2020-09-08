import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import { bind } from 'decko'

import markerUrl from './marker.svg'
import styles from './repositories-map.module.scss'

const normalize = (string) =>
  string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const fetchRepositories = (url) =>
  fetch(url)
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error(`Error loading data providers from ${url}`)
    })
    .then((repositories) =>
      repositories
        .filter(({ name }) => name && name !== 'name')
        .map((element) => ({
          ...element,
          normalizedName: normalize(element.name),
        }))
    )

class RepositoriesMap extends Component {
  mapContainer = null

  state = {
    isLoading: true,
  }

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
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      layers: [coverLayer],
      scrollWheelZoom: false,
    })

    const { endpoint } = this.props
    const repositories = await fetchRepositories(endpoint)

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
      styles.repositoriesMap,
      isLoading ? styles.repositoriesMapLoading : '',
      className,
    ]

    return (
      <Tag className={classList.join(' ')}>
        <div
          className={styles.repositoriesMapInner}
          ref={(element) => {
            this.mapContainer = element
          }}
        />
        {isLoading && (
          <Spinner color="primary" className={styles.repositoriesMapSpinner} />
        )}
      </Tag>
    )
  }
}

export default RepositoriesMap
