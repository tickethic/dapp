import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metadataURI = searchParams.get('uri')
    
    console.log('Event metadata API called with URI:', metadataURI)
    
    if (!metadataURI) {
      return NextResponse.json(
        { error: 'Metadata URI is required' },
        { status: 400 }
      )
    }

    // Try to fetch from IPFS - but NEVER for artist URIs
    let metadata
    try {
      if (metadataURI.startsWith('ipfs://')) {
        // NEVER fetch artist metadata for events
        if (metadataURI.startsWith('ipfs://artist-')) {
          console.log('BLOCKED: Artist URI detected for event metadata:', metadataURI)
          metadata = null
        } else {
          // Convert IPFS URI to HTTP URL - use a reliable gateway
          const ipfsHash = metadataURI.replace('ipfs://', '')
          const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`
          
          try {
            console.log('Attempting to fetch from IPFS URL:', ipfsUrl)
            const response = await fetch(ipfsUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            })
            console.log('IPFS response status:', response.status, response.ok)
            
            if (response.ok) {
              const responseText = await response.text()
              console.log('Raw IPFS response text:', responseText)
              
              try {
                const fetchedData = JSON.parse(responseText)
                console.log('Parsed JSON data from IPFS:', fetchedData)
                
                // Double check: if the fetched data looks like artist data, reject it
                if (fetchedData.name && fetchedData.external_url) {
                  console.log('BLOCKED: Fetched data looks like artist metadata:', fetchedData.name)
                  metadata = null
                } else {
                  metadata = fetchedData
                  console.log('Successfully fetched event metadata from IPFS:', metadata)
                }
              } catch (jsonError) {
                console.log('JSON parsing error:', jsonError.message)
                console.log('Response text that failed to parse:', responseText)
                // Don't set metadata, will fall back to placeholder
              }
            } else {
              console.log('IPFS fetch failed with status:', response.status)
            }
          } catch (error) {
            console.log('Error fetching from IPFS:', error.message)
          }
        }
      } else if (metadataURI.startsWith('http')) {
        // Direct HTTP URL
        try {
          const response = await fetch(metadataURI)
          if (response.ok) {
            const responseText = await response.text()
            try {
              metadata = JSON.parse(responseText)
            } catch (jsonError) {
              console.log('JSON parsing error for HTTP URL:', jsonError.message)
              console.log('Response text that failed to parse:', responseText)
            }
          }
        } catch (httpError) {
          console.log('Error fetching HTTP URL:', httpError.message)
        }
      }
    } catch (ipfsError) {
      console.warn('Failed to fetch from IPFS, using fallback:', ipfsError)
    }

    // Fallback to placeholder data if IPFS fetch fails
    if (!metadata) {
      // Extract event name from URI if it's in the format event://event-name-timestamp
      let eventName = 'Événement'
      let eventDescription = 'Un événement musical exceptionnel avec des artistes talentueux. Venez profiter d\'une soirée inoubliable dans une ambiance unique.'
      
      if (metadataURI.startsWith('event://')) {
        const eventSlug = metadataURI.replace('event://', '')
        // Parse: title-description-timestamp
        const parts = eventSlug.split('-')
        const timestamp = parts[parts.length - 1]
        
        // Remove timestamp
        const withoutTimestamp = parts.slice(0, -1).join('-')
        
        // Try to extract description (look for encoded description)
        let namePart = withoutTimestamp
        let extractedDescription = null
        
        // Look for encoded description (contains %20 or other encoded chars)
        const encodedMatch = withoutTimestamp.match(/^(.+?)-([A-Za-z0-9%]+)$/)
        if (encodedMatch) {
          namePart = encodedMatch[1]
          const encodedDesc = encodedMatch[2]
          try {
            extractedDescription = decodeURIComponent(encodedDesc.replace(/%/g, '%'))
          } catch (e) {
            // If decoding fails, use the whole part as name
            namePart = withoutTimestamp
          }
        }
        
        eventName = namePart
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        
        eventDescription = extractedDescription || `Rejoignez-nous pour ${eventName.toLowerCase()}, un événement musical exceptionnel avec des artistes talentueux. Venez profiter d'une soirée inoubliable dans une ambiance unique.`
      } else if (metadataURI.startsWith('ipfs://event-')) {
        // Handle old format ipfs://event-timestamp
        const eventSlug = metadataURI.replace('ipfs://event-', '')
        eventName = `Événement #${eventSlug}`
      } else if (metadataURI.startsWith('ipfs://artist-')) {
        // This is an artist URI being used for an event - this is wrong!
        console.warn('Artist URI used for event metadata:', metadataURI)
        const artistId = metadataURI.replace('ipfs://artist-', '')
        eventName = `Événement avec Artiste #${artistId}`
      } else {
        // Generic fallback
        eventName = `Événement #${Date.now()}`
      }
      
      metadata = {
        name: eventName,
        description: eventDescription,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2MzYWVkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1pemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50PC90ZXh0Pjwvc3ZnPg==',
        date: new Date().toISOString(),
        location: 'À définir',
        category: 'Musique'
      }
    }

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error fetching event metadata:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event metadata' },
      { status: 500 }
    )
  }
}
