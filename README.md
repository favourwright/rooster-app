# Rooster App

A modern cross-platform schedule management application built with React Native and Expo. The app provides a beautiful, intuitive interface for viewing shifts, publications, and personal schedules with real-time time indicators.

## How to Run the Project

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended): `npm install -g expo-cli`

### Installation

1. **Clone the project:**
   ```bash
   git clone https://github.com/favourwright/rooster-app.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the expo command:**
   ```bash
   npx expo start
   ```
   This launches the Expo development environment, allowing you to run the app on different platforms.

## Libraries and Dependencies

### Core Framework
- **expo** (v54.0.31) - Framework for building cross-platform apps
- **expo-router** (v6.0.21) - File-based routing system (Expo Router)
- **react** (v19.1.0) & **react-native** (v0.81.5) - UI framework

### Navigation & UI
- **@react-navigation/native** (v7.1.8) - Navigation framework
- **react-native-screens** (v4.16.0) - Native screen stack manager
- **react-native-gesture-handler** (v2.28.0) - Gesture handling
- **@gorhom/bottom-sheet** (v5) - Bottom sheet modal component

### Styling & Layout
- **nativewind** (v4.2.1) - Tailwind CSS for React Native
- **tailwind-merge** (v3.4.0) - Merge Tailwind classes without conflicts

### Calendar & Scheduling
- **react-native-calendars** (custom fork) - Calendar UI component with agenda support

### Icons & Assets
- **react-native-iconify** (v2.0.3) - Comprehensive icon library (Solar, Hugeicons, etc.)
- **expo-font** (v14.0.10) - Custom font loading

### Animation & Interaction
- **react-native-reanimated** (v4.1.1) - Smooth animations
- **react-native-worklets** (v0.5.1) - Worklet support for animations

### State Management
- **zustand** (v5.0.10) - Lightweight state management library

### Graphics
- **react-native-svg** (v15.12.1) - SVG support

## Architecture Overview

### Project Structure

```
app/
├── (tabs)/                 # Tab-based navigation group
│   ├── _layout.tsx        # Tab layout & configuration
│   ├── index.tsx          # Home screen (placeholder)
│   ├── rooster.tsx        # Main schedule/shift view
│   ├── publications.tsx    # Publications feed
│   └── profile.tsx        # User profile
├── _layout.tsx            # Root layout with theme setup
├── global.css             # Global styles
└── +not-found.tsx         # 404 page

components/
├── calendar/              # Calendar-related components
│   ├── AgendaDetailsModal.tsx      # Bottom sheet modal for shift details
│   ├── AgendaItem.tsx              # Individual shift/agenda item
│   ├── AgendaListWithIndicator.tsx # Agenda list with time marker
│   ├── CalendarArrow.tsx           # Navigation arrows
│   ├── CalendarDay.tsx             # Custom day component
│   ├── CalendarHeader.tsx          # Month/header display
│   └── CurrentTimeIndicator.tsx    # Real-time marker
├── publication/           # Publication/article components
│   ├── Header.tsx        # Publication header
│   ├── PublicationCard.tsx
│   ├── SearchBar.tsx
│   └── Tag.tsx
├── user/                  # User-related components
│   └── ProfileDetails.tsx
├── TabBar.tsx            # Custom bottom tab bar
├── Themed.tsx            # Theme wrapper
├── ExternalLink.tsx
├── EmptyScreen.tsx
├── useColorScheme.ts     # Light/dark mode hook
├── useColorScheme.web.ts # Web color scheme
└── useClientOnlyValue.ts # Client-side value wrapper

hooks/
├── useCalendar.ts            # Calendar state management
├── useAgendaWithTimeMarker.ts # Time marker insertion logic

types/
├── calendar.ts           # TypeScript interfaces for calendar/agenda

data/
├── mockAgendaData.ts     # Mock shift/agenda data

constants/
├── calendar.ts           # Calendar configurations (theme, heights)
└── Colors.ts            # Color definitions
```

### Architectural Decisions

#### 1. **File-Based Routing (Expo Router)**
   - Uses the `(tabs)` naming convention for route grouping
   - Enables dynamic, type-safe routing with automatic URL handling
   - Simplifies navigation without manual route configuration

#### 2. **Component Composition**
   - Breaks down features into focused, reusable components
   - Calendar functionality is isolated in `components/calendar/`
   - Publication features are separated in `components/publication/`
   - Follows React best practices for component isolation

#### 3. **Custom Styling with NativeWind**
   - Uses Tailwind CSS classes for consistent, utility-first styling
   - Simplifies cross-platform styling with a single design system
   - Integrated with Metro bundler for development

#### 4. **Real-Time Time Marker**
   - `useAgendaWithTimeMarker` hook intelligently inserts a current-time indicator
   - Updates every minute when viewing today's schedule
   - Proportionally positions between agenda items for visual accuracy
   - Only displayed when viewing the current date

#### 5. **Bottom Sheet Modal Navigation**
   - Uses `@gorhom/bottom-sheet` for native-feeling modals
   - Provides smooth animations with Reanimated
   - Gesture-responsive (swipe to close)
   - Better UX than traditional modals on mobile

#### 6. **Custom Tab Bar**
   - Implements a custom bottom tab bar with animated indicators
   - Uses Iconify for flexible, lightweight icon management
   - Provides visual feedback with color changes and animated focused line component
   - Responsive design with safe area considerations

#### 7. **Mock Data Structure**
   - Uses TypeScript interfaces for type-safe data handling
   - Separates data from components for easy backend integration
   - AgendaItem structure includes: hour, title, duration, color, team availability

## Key Implementation Details

### Calendar Integration
- Leverages a **custom fork** of `react-native-calendars` for enhanced agenda support
- Supports marked dates to highlight important days
- Integration with mock agenda data system

### Time Indicator Feature
The `useAgendaWithTimeMarker` hook:
- Calculates current time in minutes from midnight
- Compares against agenda item times
- Intelligently places marker between items or at start/end of day
- Re-renders every minute for accuracy on today's view
- Passes context data (previous/next item times) for proportional positioning

### Bottom Sheet Modal
The `AgendaDetailsModal` component:
- Displays full shift details in a modal
- Shows team member availability and avatars
- Includes notification history
- Supports scrolling for large content
- Fully dismissible with gesture support

### Publication (provided Bonus)
- Uses mock data with realistic article structure
- Includes author information, avatar, and read time
- Searchable interface (search function stubbed)
- Card-based layout with image previews
- Tags for article categorization