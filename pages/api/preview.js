import retrieveContent from 'content'

const preview = async (req, res) => {
  const { page, ref } = req.query

  if (!page || !ref) {
    return res
      .status(401)
      .json({ message: "Both parameters, 'page' and 'ref' must be sent" })
  }

  // Validating the URL for safety
  const origin = `https://${req.host}`
  const redirectUrl = new URL(page, origin)

  if (redirectUrl.origin !== origin) {
    return res.status(400).json({
      message:
        "Target 'page' origin doesn't match current origin. Please, use relative URLs instead",
    })
  }

  // If this is a fake request, we might break the website setting
  // ref in the preview data. Because of that, we have to validate the ref
  try {
    // Retrieving root as we care only about the ref existing.
    // Should throw if the ref is not in the repository
    await retrieveContent('', { ref })

    res.setPreviewData({ ref })
  } catch {
    // But if we return error status, 'View live' button won't work
    // what we would like to avoid
  }

  return res.redirect(redirectUrl.href.slice(redirectUrl.origin.length))
}

export default preview
