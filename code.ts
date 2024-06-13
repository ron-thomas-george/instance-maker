figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.loadAllPagesAsync();

figma.ui.onmessage = async (pluginMessage) => {
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
  const nodes: SceneNode[] = [];
  const postComponentSet = figma.root.findOne(
    (node) => node.type == "COMPONENT_SET" && node.name == "post"
  ) as ComponentSetNode;
  // const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
  // const darkVariant = figma.root.findOne(
  //   (node) =>
  //     node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true"
  // ) as ComponentNode;

  // console.log(postComponentSet);

  // console.log(pluginMessage.name);
  // console.log(pluginMessage.username);
  // console.log(pluginMessage.description);
  // console.log(pluginMessage.darkModeState);
  console.log(pluginMessage.imageVariant);

  let selectedVariant;
  if (pluginMessage.darkModeState === true) {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=true"
        ) as ComponentNode;
        break;

      case "3":
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=true"
        ) as ComponentNode;
        break;

      default:
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=none, Dark mode=true"
        ) as ComponentNode;
        break;
    }
  } else {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=false"
        ) as ComponentNode;
        break;

      case "3":
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=false"
        ) as ComponentNode;
        break;

      default:
        selectedVariant = figma.root.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=none, Dark mode=false"
        ) as ComponentNode;
        break;
    }
  }
  console.log(selectedVariant);

  const newPost = selectedVariant.createInstance();

  const templateName = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "displayName"
  ) as TextNode;

  const templateUserName = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "@username"
  ) as TextNode;

  const templateDescription = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "description"
  ) as TextNode;

  const numLikes = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "likesLabel"
  ) as TextNode;

  const numComments = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "commentsLabel"
  ) as TextNode;

  console.log(templateName.characters);
  console.log(templateUserName.characters);
  console.log(templateDescription.characters);

  templateName.characters = pluginMessage.name;
  templateUserName.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;
  numLikes.characters = Math.floor(Math.random() * 1000).toString();
  numComments.characters = Math.floor(Math.random() * 10).toString();

  nodes.push(newPost);
  figma.viewport.scrollAndZoomIntoView(nodes);

  figma.closePlugin();
};
