
# React Task Manager Test App

This is a React (web) app developed as a technical test for a React Native interview position. It demonstrates core React concepts using React Context API with `useReducer` for simple state management.

## Overview

The UI is built with `styled-components` for consistent theming and component styling.
For error handling, a custom `ErrorBoundary` component is implemented. (Note: It's placed *within* the Theme provider's tree, so it won't catch errors originating *from the Theme provider itself*).

For testing, I went with Jest and React Testing Library – tools I'm comfortable with from my React Native work. Honestly, getting Jest configured nicely with Vite took a bit of extra fiddling compared to just using Vitest. That setup challenge chewed up some time, largely spent figuring out the web-specific integration points for these tools. 

## State Management Note

The current setup handles the app's synchronous state effectively. If we needed data fetching or more complex side effects, bringing in a dedicated tool like React Query or a state manager with built-in async support (like Redux/Zustand etc) would be a much better approach than trying to add async logic directly into the current reducer setup.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status or type
- Light/dark theme support
- Custom error handling

## Installation

```bash
# Install dependencies
npm install

# Start the dev server
npm start

# Run tests
npm test
```

## Limitations

Just a friendly note that this project was built as a technical test application and shouldn't be considered production-ready code. I had to spend some time refreshing and adjusting to web React development and its distinct ecosystem compared to React Native. I've listed some key limitations below, but this isn't an exhaustive list:

*   **No Data Persistence**: Tasks are stored in memory and lost on page refresh (Local Storage was out of scope).
*   **Frontend Only**: As specified in the requirements, all data is mocked on the front-end without database integration.
*   **Limited Documentation**: While JSDoc has been added to key components, documentation isn't exhaustive.
*   **Simple Context Implementation**: State management uses React Context API + `useReducer` without middleware. This approach was chosen for simplicity and suitability for the test app's scale.
*   **Performance Considerations**: Manual performance optimizations (like extensive `React.memo`) were not the primary focus.
*   **Limited Responsive Design**: The UI adapts reasonably well, but comprehensive responsive design was not implemented due to time constraints.
*   **Accessibility (A11y)**: Standard accessibility optimizations (e.g., for screen readers, keyboard navigation) were not included.
*   **Basic Animations**: Animations rely on simple CSS transitions. (In React Native, the `Animated` API or a library like Reanimated would typically be used).
*   **Partial Test Coverage**: Includes essential component tests. A production application would require broader unit, integration, and potentially E2E tests.
*   **No List Optimization**: For very large task lists, performance could degrade. In React Native, this would be handled natively using `FlatList` or `SectionList` components, which virtualize rendering.
*   **Basic Error Boundary**: Includes a functional `ErrorBoundary`. A production application would likely implement more granular error boundaries and integrate robust error logging/monitoring.
*   **Limited Form Validation**: Form validation uses basic React state. Robust validation (e.g., using a form library) and checks like text length limits are not implemented.
*   **No Input Sanitization**: While not critical for this demo without a backend, a production app must implement proper input sanitization.