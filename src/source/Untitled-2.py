

def a_star(graph, h, start, goal):
    open_list = [start]
    g = {start: 0}
    parent = {start: None}

    while open_list:
        # Pick node with lowest f = g + h
        current = min(open_list, key=lambda x: g[x] + h[x])

        if current == goal:
            # Build path
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1]

        open_list.remove(current)

        for (neighbor, cost) in graph[current]:
            new_cost = g[current] + cost

            if neighbor not in g or new_cost < g[neighbor]:
                g[neighbor] = new_cost
                parent[neighbor] = current
                if neighbor not in open_list:
                    open_list.append(neighbor)

    return None


# Example graph (very simple)
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('D', 2)],
    'C': [('D', 5)],
    'D': []
}

# Heuristic values
h = {'A': 3, 'B': 2, 'C': 4, 'D': 0}

# Run A*
print(a_star(graph, h, 'A', 'D'))
