import DOMProperty from 'react/lib/DOMProperty';
import EventPluginRegistry from 'react/lib/EventPluginRegistry';

/*
 * Inspired from https://github.com/facebook/react/blob/master/src/renderers/dom/shared/devtools/ReactDOMUnknownPropertyDevtool.js
 */

const reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
};

const validateProperty = function(tagName, name) {
  let warnedProperties = {};
  if (DOMProperty.properties.hasOwnProperty(name) || DOMProperty.isCustomAttribute(name)) {
    return true;
  }
  if (reactProps.hasOwnProperty(name) && reactProps[name] ||
    warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
    return true;
  }
  if (EventPluginRegistry.registrationNameModules.hasOwnProperty(name)) {
    return true;
  }
  warnedProperties[name] = true;
  const lowerCasedName = name.toLowerCase();
  const standardName = (
    DOMProperty.isCustomAttribute(lowerCasedName) ?
      lowerCasedName :
      DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ?
        DOMProperty.getPossibleStandardName[lowerCasedName] :
        null
  );
  const registrationName = (
    EventPluginRegistry.possibleRegistrationNames.hasOwnProperty(
      lowerCasedName
    ) ?
      EventPluginRegistry.possibleRegistrationNames[lowerCasedName] :
      null
  );
  if (standardName != null) {
    return true;
  } else if (registrationName != null) {
    return true;
  } else {
    return false;
  }
};

const ensureDomProps = (props, tagName) => {
  let validProps = {};
  for (const key in props) {
    const isValid = validateProperty(tagName, key);
    if (isValid) {
      validProps[`${key}`] = props[key];
    }
  }
  return validProps;
};

export default ensureDomProps;