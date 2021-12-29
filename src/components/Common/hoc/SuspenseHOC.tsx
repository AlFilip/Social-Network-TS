import React from 'react'


export function SuspenseHOC<T>(Component: React.FC<T>) {
    return (props: T) => (
        <React.Suspense fallback={ <div>loading</div> }>
            <Component { ...props as T }/>
        </React.Suspense>
    )
}